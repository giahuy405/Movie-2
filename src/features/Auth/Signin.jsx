import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../../HOCs/Layout';
import { postLoginInfo } from './thunk';

const Signin = () => {
    const [loginInfo, setloginInfo] = useState({ taiKhoan: "", matKhau: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = e => {
        const { value, name } = e.target;
        setloginInfo({ ...loginInfo, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(postLoginInfo(loginInfo));
        // nếu user đăng nhập thành công thì đẩy user qua trang login 
        // và do hàm dispatch là hàm bất đồng bộ nên, navigate sẽ chạy trước, điều này sẽ gây ra lỗi
        // chưa fetchAPI xong đã chuyển qua trang home thì toang
        // nên dùng async await để đợi thằng dispatch call API xong mới navigate
        // bên trong hàm dispatch nhớ dùng try catch ko dc dùng .then().catch() sẽ ko chạy dc
        navigate('/')
    }
    return (
        <Layout>
            <div className="">
                <div className="mb-8">
                    <div className="py-4 bg-orange-200  lg:bg-white flex justify-center lg:justify-center lg:pb-0">
                        <div className="cursor-pointer flex items-center">
                            <div>
                                <img width={65} src="https://movie-booking-project.vercel.app/img/headTixLogo.png" alt="logo" />
                            </div>
                            <div className="text-2xl text-orange-600 tracking-wide ml-2 font-semibold ">TIX VN</div>
                        </div>
                    </div>
                    <div className="mt-6 px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 max-w-xl mx-auto shadow-2xl py-4 rounded-xl">
                        <h2 className="text-center text-2xl text-orange-600 font-display font-semibold   xl:text-3xl
          xl:text-bold">Đăng nhập</h2>
                        <div className="mt-8">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-600"
                                        type
                                        name='taiKhoan'
                                        onChange={handleChange}
                                        placeholder="Nhập tài khoản" />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Mật khẩu
                                        </div>
                                    </div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-orange-600 "
                                        name='matKhau'
                                        type='password'
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu" />
                                </div>
                                <div className="mt-10">
                                    <button
                                        type='submit'
                                        className="bg-orange-600 text-gray-100 p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                      shadow-lg duration-300">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Bạn chưa có tài khoản ? <NavLink to='/signup' className="cursor-pointer text-orange-600 hover:text-orange-700">Đăng ký</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    );
};

export default Signin;