import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const Header = () => {
    const activeClass = '';
    const { infoUser } = useSelector(state => state.authReducer);
    return (
        <div>
            <header className="p-2 bg-white text-black sticky top-0 z-50 shadow-md">
                <div className="container flex justify-between   mx-auto">
                    <NavLink rel="noopener noreferrer" to='/' aria-label="Back to homepage" className="flex items-center">
                        <img width={40} src="https://movie-booking-project.vercel.app/img/headTixLogo.png" alt="" />
                    </NavLink>
                    <ul className="items-stretch hidden space-x-3 lg:flex">
                        <li className="flex">
                            <a rel="noopener noreferrer" href="#lichChieu" className="flex items-center px-4  border-b-2 dark:border-transparent ">Phim</a>
                        </li>
                        <li className="flex">
                            <a rel="noopener noreferrer" href="#suatChieu" className="flex items-center px-4  border-b-2 dark:border-transparent ">Suất chiếu</a>
                        </li>
                        <li className="flex">
                            <a rel="noopener noreferrer" href="#lichChieu" className="flex items-center px-4  border-b-2 dark:border-transparent ">Tin tức</a>
                        </li>
                    </ul>

                    {infoUser ?
                        <nav className='flex items-center'>
                            <h5>Hi, <span className='text-green-600 font-semibold'>{infoUser.hoTen}</span></h5>
                            <NavLink className=' bg-orange-600 px-4 py-2  rounded  ml-4 text-white'>
                                Đăng xuất
                            </NavLink>
                        </nav>
                        :
                        <div className="items-center flex-shrink-0 hidden lg:flex">
                            <NavLink to='/signin'
                                className={p => {
                                    const classes = "self-center px-6 py-2 rounded";
                                    if (p.isActive) return `text-yellow-500 font-bold ${classes}`
                                    return `${classes}`
                                }}
                            >Đăng nhập</NavLink>
                            <NavLink to='/signup'
                                className={p => {
                                    const classes = "self-center px-6 py-2 font-semibold rounded   text-white";
                                    if (p.isActive) return `text-yellow-400 font-bold ${classes} bg-orange-500 hidden`
                                    return `${classes} bg-orange-500`
                                }}
                            >Đăng ký</NavLink>
                        </div>
                    }
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                </div>
            </header>

        </div>

    );
};

export default Header;