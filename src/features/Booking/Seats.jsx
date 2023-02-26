import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './utils/seats.module.css'
import { fetchListSeat, postBookTicket } from './thunk'
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { Tabs } from 'antd';
import * as actionTypes from './constants'
import Loading from '../../components/Loading';
import { ExclamationCircleOutlined, EnterOutlined } from '@ant-design/icons'
const Tabs1 = () => {
    const { infoUser } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const { listSeat, orderSeats } = useSelector(state => state.bookingReducer);
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchListSeat(id))
    }, []);
    const { thongTinPhim, danhSachGhe } = listSeat;
    const totalCount = orderSeats?.reduce((pre, curr) => pre + curr.giaVe, 0);
    const displaySeats = () => {
        return <>
            {danhSachGhe?.map((item, index) => {
                const classVipSeat = item.loaiGhe === 'Vip' ? 'VipSeat' : '';
                const classReversedSeat = item.daDat === true ? 'reservedSeat' : "";
                // khai báo let vì cần đổi giá trị
                let classCurrentSeat = '';


                // ktra trùng ghế trong mảng
                let indexCurrentSeat = orderSeats?.findIndex(seat => seat.maGhe === item.maGhe);
                if (indexCurrentSeat != -1) {
                    classCurrentSeat = 'currentChooseSeat'
                } else {
                    classCurrentSeat = ''
                }

                return <Fragment key={item.stt}>
                    <div className='inline-block relative'>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: actionTypes.ORDER_SEAT,
                                    payload: item
                                })
                            }}

                            disabled={item.daDat} className={`normalSeat ${classVipSeat} ${classReversedSeat} ${classCurrentSeat}`} > {item.daDat ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="X-icon-button">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                                : ''}
                        </button>
                    </div>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            }
            )}
        </>
    }
    return (
        <div className='grid grid-cols-12 h-full'>
            <div className='lg:col-span-9 p-1 md:p-0 col-span-12'>
                <div className={style.screen}></div>
                <div className={style.trapezoid}>Màn hình</div>
                <div className='text-center mt-3'>
                    <div className='mx-auto w-full'>
                        {displaySeats()}
                    </div>
                    <div className='grid grid-cols-2 gap-5  sm:grid-cols-4 sm:gap-0 max-w-xl mx-auto mt-5'>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat"></button>
                            <p>Ghế thường</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat VipSeat"></button>
                            <p>Ghế VIP</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat currentChooseSeat"></button>
                            <p>Ghế đang chọn</p>
                        </div>
                        <div className='text-center text-sm text-gray-500'>
                            <button className="normalSeat reservedSeat">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="X-icon-button">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <p>Ghế đã được mua</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3 flex flex-col p-4 shadow-2xl col-span-12 rounded-xl md:mr-4">
                <h3 className='font-bold text-xl text-center mb-2'>
                    HÓA ĐƠN</h3>
                <hr />
                <div className='mt-1 mb-2'>
                    <h3 className='font-bold '>{thongTinPhim?.tenPhim}</h3>
                    <p className='text-sm'>{thongTinPhim?.diaChi}</p>
                    <p className='text-sm'>{thongTinPhim?.tenCumRap}</p>
                    <p className='text-sm'> {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                    <p></p>
                </div>
                <hr />
                <div className='mt-1 mb-2'>
                    <p className='text-sm text-gray-500'>Ghế</p>
                    <div className="flex flex-wrap">
                        {_.sortBy(orderSeats, ['tenGhe'])?.map(item =>
                            <span className='mr-2 text-lime-500 font-bold'>{item.tenGhe}</span>
                        )}
                    </div>

                </div>
                <hr />
                <div className='mt-1 mb-2'>
                    <p className='text-gray-400 text-sm'>Email</p>
                    <p>{infoUser?.email}</p>
                </div>
                <hr />
                <div className='mt-1 mb-2'>
                    <p className='text-gray-400 text-sm'>Số điện thoại</p>
                    <p>{infoUser?.soDT}</p>
                </div>
                <hr />
                <div className='mt-1 mb-2'>
                    <p className='text-gray-400 text-sm'>Tổng tiền </p>
                    <p className='font-bold'> {totalCount.toLocaleString()} đ</p>
                </div>
                <hr />
                <div style={{ fontSize: 12 }} className='mt-1 mb-3'>
                    <p className='text-red-500 flex items-center'><ExclamationCircleOutlined className='mr-1' />Lưu ý : </p>
                    <p>Vé đã mua không thể đổi hoặc hoàn tiền.</p>
                </div>
                <div className='mt-auto'>
                    <div
                        onClick={() => {
                            const info = {
                                maLichChieu: id,
                                danhSachVe: orderSeats
                            }
                           totalCount && dispatch(postBookTicket(info))
                        }}
                        className='bg-lime-500 text-center hover:bg-lime-600 duration-300 p-3 cursor-pointer font-bold rounded-xl text-white  '>
                        THANH TOÁN
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tabs2 = () => {
    return (
        <div className='max-w-3xl mx-auto'>
            <h3 className='text-center text-xl font-bold text-lime-500'>THANH TOÁN THÀNH CÔNG !</h3>
            <div className="text-center">
                <div className=''>
                    <img width={400} className='mx-auto' src="https://cdni.iconscout.com/illustration/premium/thumb/family-watching-movie-at-cinema-4393228-3696988.png" alt="1" />
                </div>
                <div className='font-bold'>
                    TIX Việt Nam chúc bạn xem phim vui vẻ !
                </div>
                <div className='mt-4'>
                    <NavLink to='/' className='font-bold 
                focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-red-900 hover:text-white duration-300'>Quay lại trang chủ <EnterOutlined className='ml-1' />  </NavLink>
                </div>
            </div>

        </div>
    );
};

const items = [
    {
        key: '1',
        label: <h3 className='font-bold'>  CHỌN GHẾ & THANH TOÁN </h3>,
        children: <div>
            <Tabs1 />
        </div>,
    },
    {
        key: '2',
        label: <h3 className='font-bold'>XEM LẠI THÔNG TIN</h3>,
        children: <Tabs2 />,
    },
    {
        key: '3',
        label: <h3 className='font-bold'>HOÀN TẤT</h3>,
        children: <div></div>,
    },
   

];

const Seats = () => {
    const {activeTabs} = useSelector(state=>state.bookingReducer);
    return (
        <div>
            <div className='container mx-auto'>
                <Tabs
                     
                    activeKey={activeTabs}
                    type="card"
                    items={items}
                />
            </div>
            <Loading />
        </div>
    );
};

export default Seats;