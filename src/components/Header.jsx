import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LOG_OUT } from '../features/Auth/constants';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'
import { Select } from 'antd';
const Header = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { infoUser } = useSelector(state => state.authReducer);
    const handleChange = (value = "vi") => i18n.changeLanguage(value)
    let token = localStorage.getItem('userToken');
    return (
        <div>
            <header className="p-2 bg-white text-black fixed dark:bg-[#222831] dark:text-white top-0 z-50 shadow-md w-full">
                <div className="container flex justify-between   mx-auto">
                    <NavLink rel="noopener noreferrer" to='/' aria-label="Back to homepage" className="flex items-center">
                        <img width={40} src="https://movie-booking-project.vercel.app/img/headTixLogo.png" alt="" />
                    </NavLink>
                    {/* <ul className="items-stretch hidden space-x-3 lg:flex">
                        <li className="flex">
                            <a rel="noopener noreferrer" href="#lichChieu" className="flex items-center px-4  border-b-2 dark:border-transparent ">Phim</a>
                        </li>
                        <li className="flex">
                            <a rel="noopener noreferrer" href="#suatChieu" className="flex items-center px-4  border-b-2 dark:border-transparent ">Suất chiếu</a>
                        </li>
                        <li className="flex">
                            <a rel="noopener noreferrer" href="#lichChieu" className="flex items-center px-4  border-b-2 dark:border-transparent ">Tin tức</a>
                        </li>
                    </ul> */}
                    {(token && infoUser) ?
                        <nav className='flex items-center'>
                            <NavLink
                                className='mr-2 flex  items-center hover:text-orange-500 duration-300' to='/profile'>
                                <img width={36} className='rounded-full border-2 border-orange-600  ' src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                                <p className='font-bold ml-1 hidden sm:block'>{infoUser.taiKhoan}</p>
                            </NavLink>
                            <Select
                                defaultValue="1"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: '1', label: 'Language' },
                                    { value: 'vi', label: 'Vietnamese' },
                                    { value: 'en', label: 'English' },
                                    { value: 'chi', label: 'Chinese' },
                                ]}
                            />
                            <button
                                onClick={async () => {
                                    Swal.fire({
                                        text: 'Bạn chắc chắn muốn đăng xuất ?',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#EA580C',
                                        cancelButtonColor: 'grey',
                                        confirmButtonText: 'Log out'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            localStorage.removeItem('userToken');
                                            dispatch({
                                                type: LOG_OUT
                                            })
                                            Swal.fire({
                                                title: 'Đăng xuất thành công',
                                                icon: 'success',
                                                timer: 1500,
                                            })
                                        }
                                    })
                                }}
                                className=' bg-orange-500 px-2 py-1 md:px-4 md:py-2  hover:bg-orange-700 rounded  ml-2 text-white'>
                                {t('Đăng xuất')}
                            </button>
                        </nav>
                        :
                        <div className="items-center flex-shrink-0 hidden lg:flex">
                            <NavLink to='/signin'
                                className={p => {
                                    const classes = "self-center px-6 py-2 rounded";
                                    if (p.isActive) return `text-yellow-500 font-bold ${classes}`
                                    return `${classes}`
                                }}
                            >{t('Đăng nhập')}</NavLink>
                            <NavLink to='/signup'
                                className={p => {
                                    const classes = "self-center px-6 py-2 font-semibold rounded   text-white hover:bg-orange-700 duration-300 mr-2";
                                    if (p.isActive) return `text-yellow-400 font-bold ${classes} bg-orange-500 hidden mr-2`
                                    return `${classes} bg-orange-500`
                                }}
                            >{t('Đăng ký')}</NavLink>
                            <Select
                                defaultValue="1"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: '1', label: 'Language' },
                                    { value: 'vi', label: 'Vietnamese' },
                                    { value: 'en', label: 'English' },
                                    { value: 'chi', label: 'Chinese' },
                                ]}
                            />
                        </div>
                    }
                </div>
            </header>

        </div>

    );
};

export default Header;