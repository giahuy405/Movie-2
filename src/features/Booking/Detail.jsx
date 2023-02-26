import React, { useEffect } from 'react';
import style from './utils/detail.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailMovie } from './thunk';
import { NavLink, useParams } from 'react-router-dom';
import { Rate, Tabs } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import Layout from '../../HOCs/Layout';
const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { detailMovie } = useSelector(state => state.bookingReducer);

    // lấy id trên url sau đó fetchAPI để lấy dữ liệu của phim sau đó render ra giao diện
    useEffect(() => {
        dispatch(fetchDetailMovie(id))
    }, [])


    const items = [
        {
            key: '1',
            label: <h3 className='text-lg font-bold' >LỊCH CHIẾU</h3>,
            children: <>
                {detailMovie.heThongRapChieu?.length ?
                    <Tabs
                        tabPosition='left'
                        items={detailMovie.heThongRapChieu?.map(item => {
                            return {
                                key: item.maHeThongRap,
                                label: <div className='min-w-[200px] flex items-center'>
                                    <img src={item.logo} alt={item.logo} width={40} className='mr-3' />
                                    <h3>{item.tenHeThongRap}</h3>
                                </div>,
                                children: item.cumRapChieu?.map(item =>
                                    <div key={item.maCumRap} className='ml-4 flex' >
                                        <img src={item.hinhAnh} alt={item.hinhAnh} width={60} className='mr-3' />
                                        <div>
                                            <h3 className='font-bold'>{item.tenCumRap}</h3>
                                            <p className='text-gray-500' style={{ fontSize: 12 }}>{item.diaChi}</p>
                                            <div className="grid grid-cols-4 gap-2">
                                                {item.lichChieuPhim?.slice(0, 4).map(item =>
                                                    <NavLink to='/' key={item.maRap} className='bg-slate-400 p-1 inline-block rounded-sm text-white hover:bg-orange-600 hover:text-black' >
                                                        {moment(item.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                        })}
                    /> :
                    <h3 className='text-center text-lg'>Hiện tại phim chưa có lịch chiếu</h3>
                }
            </>,
        },
        {
            key: '2',
            label: <h3 className='text-lg font-bold' >THÔNG TIN</h3>,
            children: <div>
                <div className="grid grid-cols-12 px-8 pt-2">
                    <div className='col-span-6'>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >Ngày công chiếu</h3>
                            <p className='w-2/3'>{moment(detailMovie.ngayKhoiChieu).format('L')}</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >Tình trạng</h3>
                            <p className='w-2/3'>{detailMovie.sapChieu ? <span className='tagDetailSapChieu'>Sắp chiếu</span> : <span className='tagDetailDangChieu'>Đang chiếu</span>}</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >Đạo diễn</h3>
                            <p className='w-2/3'>John Davis</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >Diễn viên</h3>
                            <p className='w-2/3'>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >Thể loại</h3>
                            <p className='w-2/3'>Hành Động, Giả Tưởng</p>
                        </div>
                        <div className="flex mb-2">
                            <h3 className='font-bold w-1/3' >Quốc gia</h3>
                            <p className='w-2/3'>Mỹ</p>
                        </div>

                    </div>
                    <div className='col-span-6'>
                        <h3 className='font-bold mb-2'> Nội dung </h3>
                        <p>{detailMovie.moTa}</p>
                    </div>
                </div>
            </div>,
        },

    ]
    return (
        <Layout>
            <div className={style['glass-container']} style={{ backgroundImage: `url(${detailMovie.hinhAnh})` }} >
                <div className={style.glass}></div>
                <div className={style.content} >
                    <div className="mx-auto max-w-4xl mt-14 flex  justify-between">
                        <div className='flex font-bold text-white'>
                            <img width={200} src={detailMovie.hinhAnh} className='shadow-2xl' alt="" />
                            <div className='ml-4 max-w-lg'>
                                <p>{moment(detailMovie.ngayKhoiChieu).format('DD/MM/yyyy - hh:mm A')}</p>
                                <h3 className='text-3xl mt-3'>{detailMovie.tenPhim}</h3>
                                <div className='flex my-1'>
                                    {detailMovie.hot && <div className="tagDetailHot mr-3">Hot</div>}
                                    {detailMovie.dangChieu && <div className="tagDetailDangChieu mr-3">Đang chiếu</div>}
                                    {detailMovie.sapChieu && <div className="tagDetailSapChieu ">Sắp chiếu</div>}
                                </div>

                                <p style={{ fontSize: 14, fontWeight: "normal" }}>{detailMovie.moTa}</p>
                                <br />
                                <NavLink to='/seats' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' >
                                    MUA VÉ
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="circleRate">
                                <span>{detailMovie.danhGia / 2}</span>
                            </div>
                            <div className='bg-slate-400 bg-opacity-30 rounded-lg p-1 px-1 my-1'>
                                <Rate style={{ background: "white", padding: '2px 7px', borderRadius: 6 }} allowHalf value={detailMovie.danhGia / 2} />
                            </div>
                            <p className='text-white'> {detailMovie.danhGia} người đánh giá</p>

                        </div>
                    </div>


                </div>

            </div>
            <div className='bg-slate-700 py-10'>
                <div className='detailTabs mx-auto max-w-4xl text-white bg-white rounded-lg min-h-[350px] shadow-2xl'>
                    <Tabs
                        style={{ outline: 'none' }}
                        defaultActiveKey="1"
                        centered
                        items={items}
                    />
                </div>
            </div>

        </Layout>
    );
};

export default Detail;