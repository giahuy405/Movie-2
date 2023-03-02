import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../HOCs/Layout';
import { Tabs } from 'antd';
import { Formik, Form } from 'formik';
import { advanceSchema } from '../../schemas';
import CustomInput from './components/CustomInput';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, updateUser } from './thunk';
import { Table } from 'antd';
import Swal from 'sweetalert2';
import moment from 'moment';

const Profile = () => {

    const { t, i18n } = useTranslation();
    const { infoUser } = useSelector(state => state.authReducer);
    console.log('dsadsa', infoUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onChangeTabs = (key) => {
        console.log(key);
    };
    // luôn scroll to top mặc định
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    useEffect(() => {
        // window.location.reload(false)
    }, [infoUser])

    let token = localStorage.getItem('userToken');
    // kiểm tra nếu chưa có token thì dù user login vào /profile cũng sẽ đá user sang /signin
    useEffect(() => {
        if (!token) {
            navigate('/signin')
        }
    }, [token]);
    const onSubmit = async (values, actions) => {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        console.log(values)
        actions.resetForm();

        await dispatch(updateUser(values));
        await dispatch(fetchProfile)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        await Toast.fire({
            icon: 'success',
            title: 'Cập nhập thành công !'
        })

        // windlow.location.reload nhận vào 2 tham số là true và false
        // set false thì trình duyệt sẽ reload the current document from the cache,browser will not make an HTTP request from server
        //This can be useful to reload a page quickly, especially if you have slow internet or the page requires a lot of resources to load.
        // tóm lại : 
        // false -> reload cache 
        // true -> reload server
        // window.location.reload(false)
    }
    const items = [
        {
            key: '1',
            label: <h3 className='font-bold'>THÔNG TIN TÀI KHOẢN</h3>,
            children: <>
                {/* đợi có infoUser thì mới render form ra */}
                <Formik
                    initialValues={{
                        taiKhoan: `${infoUser?.taiKhoan}`,
                        matKhau: `${infoUser?.matKhau}`,
                        confirmPassword: `${infoUser?.confirmPassword || infoUser?.matKhau}`,
                        email: `${infoUser?.email}`,
                        soDt: `${infoUser?.soDT}`,
                        maNhom: `${infoUser?.maNhom}`,
                        hoTen: `${infoUser?.hoTen}`,
                        maLoaiNguoiDung: "KhachHang"
                    }}
                    validationSchema={advanceSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-w-2xl ">
                                {/* tài khoản  */}
                                <div className='md:col-span-1 col-span-2'>
                                    <p className='text-gray-500'>Tài khoản</p>
                                    <CustomInput
                                        disabled={true}
                                        label='Tài khoản'
                                        name='taiKhoan'
                                        type='text'
                                        value={infoUser.taiKhoan}
                                    />
                                </div>
                                {/* họ tên */}
                                <div className='md:col-span-1 col-span-2'>
                                    <p className='text-gray-500'>Họ và tên</p>
                                    <CustomInput
                                        label='Họ và tên'
                                        name='hoTen'
                                        type='text'
                                        placeholder='Nhập họ và tên'
                                    />
                                </div>
                                {/* mật khẩu */}
                                <div className='md:col-span-1 col-span-2'>
                                    <p className='text-gray-500'>Mật khẩu</p>
                                    <CustomInput
                                        label='Mật khẩu'
                                        name='matKhau'
                                        type='text'
                                        placeholder='Nhập mật khẩu'
                                    />
                                </div>
                                {/* XÁC THỰC mật khẩu */}
                                <div className='md:col-span-1 col-span-2'>
                                    <p className='text-gray-500'>Xác thực mật khẩu</p>
                                    <CustomInput
                                        label='Xác thực mật khẩu'
                                        name='confirmPassword'
                                        type='text'
                                        placeholder='Nhập lại mật khẩu'
                                    />
                                </div>

                                {/* email */}
                                <div className='md:col-span-1 col-span-2'>
                                    <p className='text-gray-500'>Email</p>
                                    <CustomInput
                                        label='Email'
                                        name='email'
                                        type='text'
                                        placeholder='Nhập email'
                                    />
                                </div>
                                {/*  sdth */}
                                <div className='md:col-span-1 col-span-2'>
                                    <p className='text-gray-500'>Số điện thoại</p>
                                    <CustomInput
                                        label='Số điện thoại'
                                        name='soDt'
                                        type='text'
                                        placeholder='Nhập số điện thoại'
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                {!isSubmitting ?
                                    <button
                                        type='submit'
                                        className='duration-300 focus:outline-none text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900'>
                                        {t('Cập nhật')}
                                    </button>
                                    :
                                    <div className=''>
                                        <button
                                            type="button"
                                            disabled
                                            class="focus:outline-none text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900
                            flex items-center
                            ">
                                            <svg class="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                                                <path
                                                    class="fill-blue-800"
                                                    d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                                                <path
                                                    class="fill-blue-100"
                                                    d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                                            </svg>
                                            <span className='ml-2'>{t('Đang tải ...')}</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </>,
        },
        {
            key: '2',
            label: <h3 className='font-bold'>LỊCH SỬ ĐẶT VÉ</h3>,
            children: <>
                <ProfileTable />
            </>,
        },
    ];

    return (
        <Layout>
            <div className='container mx-auto mt-20 mb-10'>
                <div className="grid grid-cols-12">
                    <div className='md:col-span-2 text-center col-span-12'>
                        <img className='rounded-full border-4 border-orange-500 mx-auto' width={180} src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="avatar" />
                        <h3 className='text-lg font-bold text-center'>{infoUser?.hoTen}</h3>
                    </div>
                    <div className='md:col-span-10 md:pl-10 col-span-12 px-3'>
                        {infoUser && <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />}
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Profile;


const ProfileTable = () => {
    const { infoUser } = useSelector(state => state.authReducer);


    const columns = [
        {
            title: 'STT',
            dataIndex: 'giaVe',
            value: (text) => <div>{text}</div>,
        
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            value: (text) => <div>{text}</div>,
        },
        {
            title: 'Ngày chiếu',
            dataIndex: 'ngayDat',
       
        },
        {
            title: 'Tên rạp',
            dataIndex: '',
             
        },
        {
            title: 'Mã vé',
            dataIndex: 'maVe',
            value: (text) => <div>{text}</div>,
        },
        {
            title: 'Giá vé (vnd)',
            dataIndex: 'address',
        },

    ];
    const data = infoUser?.thongTinDatVe;
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return <Table columns={columns} dataSource={data} onChange={onChange} />
}