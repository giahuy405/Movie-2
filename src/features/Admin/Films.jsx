import { Breadcrumb, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../HOCs/AdminLayout';
import { Input, Space } from 'antd';
import { AudioOutlined, CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../Booking/thunk';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { deleteFilmAdmin, fetchMoviesAdmin } from './thunk';
import { Content } from 'antd/es/layout/layout';
import moment from 'moment';
import Swal from 'sweetalert2';

const { Search } = Input;

const Films = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParam, setUseSearchParam] = useSearchParams();
    const { moviesList } = useSelector(state => state.adminReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchMoviesAdmin(searchParam.get('groupID')));
    }, []);
    const handleChangeSelect = async (groupID) => {
        await setUseSearchParam({ groupID });
        await dispatch(fetchMoviesAdmin(groupID));
    }
    const onChange = () => { }
    // debounce search 
    const debounce = (func, timeout) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), timeout);
        };
    };
    const search = (term) => {
        const ID = searchParam.get('groupID')
        console.log(ID)
        // Perform the search logic here
        dispatch(fetchMoviesAdmin(ID, term));
    };

    const debouncedSearch = debounce(search, 600);
    const handleChangeSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term)
        debouncedSearch(term);
    }

    const columns = [
        {
            title: "Mã phim",
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            // value: (text, object) => <span>{text}</span>
        },
        {
            title: "Hình ảnh",
            dataIndex: 'hinhAnh',
            render: (text, obj) => <img width={35} src={text} alt={text}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://picsum.photos/200";
                }}
            />,
        },
        {
            title: "Tên phim",
            dataIndex: 'tenPhim',
            width: 260
        },
        {
            title: "Sắp chiếu",
            dataIndex: 'sapChieu',
            render: (text, obj) => <div className='text-center'>
                {text ? <CheckCircleOutlined className='text-green-500 text-xl leading-6' /> : <CloseCircleOutlined className='text-red-500 text-xl leading-6' />}
            </div>
        },
        {
            title: "Đang chiếu",
            dataIndex: 'dangChieu',
            render: (text, obj) => <div className='text-center'>
                {text ? <CheckCircleOutlined className='text-green-500 text-xl leading-6' /> : <CloseCircleOutlined className='text-red-500 text-xl leading-6' />}
            </div>
        },
        {
            title: "Phim Hot",
            dataIndex: 'hot',
            render: (text, obj) => <div className='text-center'>
                {text ? <CheckCircleOutlined className='text-green-500 text-xl leading-6' /> : <CloseCircleOutlined className='text-red-500 text-xl leading-6' />}
            </div>
        },

        {
            title: "Ngày chiếu",
            dataIndex: 'ngayKhoiChieu',
            render: (text, obj) => <>
                {moment(text).format('DD/MM/YYYY')}
            </>
        },
        {
            title: "Tùy chỉnh",
            dataIndex: 'index',
            render: (text, obj) => <div className='flex'>
                <NavLink to={`/admin/films/edit/${obj.maPhim}`} className='bg-blue-500 hover:text-white hover:bg-blue-700   text-white p-1 px-2  rounded  '><EditOutlined /></NavLink>
                <button
                    onClick={async () => {
                        await Swal.fire({
                            title: 'Bạn chắc chắn muốn xóa ?',
                            text: "Sẽ không hoàn lại được!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#ff7733',
                            cancelButtonColor: 'grey',
                            confirmButtonText: 'Xác nhận',
                            cancelButtonText: 'Hủy'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(deleteFilmAdmin(obj.maPhim));
                                Swal.fire(
                                    'Đã xóa!',
                                    'Phim đã được xóa.',
                                    'success'
                                )
                            }
                        })
                        await dispatch(fetchMoviesAdmin(searchParam.get('groupID')));
                    }}
                    className='bg-red-500 hover:text-white hover:bg-red-700  text-white p-0.5 px-2  rounded mx-1'><DeleteOutlined /></button>
                <NavLink
                onClick={()=>{
                    localStorage.setItem('film',JSON.stringify(obj))
                }}
                to={`/admin/showtimes/${obj.maPhim}`} className='bg-lime-500 hover:text-white hover:bg-lime-700   text-white p-1 px-2  rounded  '><CalendarOutlined /></NavLink>
            </div>
        },
    ];
    return (
        <AdminLayout>
            <Breadcrumb   >
                Admin / Phim
            </Breadcrumb>
            <Content   >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }} >
                    <div className='flex mb-5 items-center'>
                        <NavLink
                            className='bg-white border border-orange-500 py-1.5 px-2 mr-5 rounded text-orange-500 hover:text-white hover:bg-orange-500'
                            to='/admin/films/addnew'>Thêm phim mới <PlusCircleOutlined /> </NavLink>
                        <Search
                            placeholder="Tìm kiếm tên phim "
                            allowClear
                            // enterButton="Tìm kiếm"
                            size="default"
                            value={searchTerm}
                            onChange={handleChangeSearch}
                            // onSearch={onSearchFilm}
                            className=' block w-[30%] mr-3'
                        />
                        <Select
                            className='admin'
                            value={searchParam.get('groupID') ? searchParam.get('groupID') : 'GP01'}
                            onChange={handleChangeSelect}
                            options={[
                                {
                                    value: 'GP01',
                                    label: 'Mã nhóm GP01',
                                },
                                {
                                    value: 'GP02',
                                    label: 'Mã nhóm GP02',
                                },
                                {
                                    value: 'GP03',
                                    label: 'Mã nhóm GP03',
                                },
                                {
                                    value: 'GP04',
                                    label: 'Mã nhóm GP04',
                                },
                            ]}
                        />
                    </div>
                    {/* NOTE check bằng object */}
                    {moviesList.length > 0 ?
                        <Table columns={columns} dataSource={moviesList} onChange={onChange}
                            scroll={{ y: 400 }}
                            pagination={{
                                pageSize: 10,
                            }}
                        />
                        :
                        <div className='mt-20 w-full flex justify-center items-center'>
                            <div className="loader">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>}
                </div>
            </Content>
        </AdminLayout>
    );
};

export default Films;