import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, } from 'react-router-dom';
import Loading from '../../components/Loading';
import AuthLayout from '../../HOCs/AuthLayout';
import { postLoginInfo } from './thunk';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';
const Signin = () => {
    const [loginInfo, setloginInfo] = useState({ taiKhoan: "", matKhau: "" });
    const [errorInfo, setErrorInfo] = useState({ taiKhoan: "", matKhau: "" });
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = useCallback(e => {
        const { value, name } = e.target;
        setloginInfo({ ...loginInfo, [name]: value })
    })
    const handleBlur = useCallback(e => {
        const { value, name } = e.target;
        setErrorInfo({ ...errorInfo, [name]: validation(name, value) })
    })
    const validation = useCallback((name, value) => {
        switch (name) {
            case 'taiKhoan': {
                if (!value.trim()) return "Tài khoản không được bỏ trống";
                if (!/^(?=[a-zA-Z0-9._]{6,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/g.test(value)) return "Tên tài khoản không hợp lệ"
                return "";
            }
            case "matKhau": {
                if (!value.trim()) return "Mật khẩu không được bỏ trống";
                if (!/[0-9A-Za-z]{5,10}/g.test(value)) return "Mật khẩu không hợp lệ"
                return "";
            }
            default: return ""
        }
    }, [])
    const handleSubmit = async e => {
        e.preventDefault();
        // kiểm tra validation 
        const validationErrors = {};
        for (let key in loginInfo) {
            const error = validation(key, loginInfo[key]);
            if (error) validationErrors[key] = error;
        }

        console.log(validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            setErrorInfo({ ...errorInfo, ...validationErrors });
            console.log(errorInfo)
            return
        }
        console.log('loginIn', loginInfo)
        await dispatch(postLoginInfo(loginInfo));

        // nếu user đăng nhập thành công thì đẩy user qua trang home 
        // và do hàm dispatch là hàm bất đồng bộ nên, navigate sẽ chạy trước, điều này sẽ gây ra lỗi
        // chưa fetchAPI xong đã chuyển qua trang home thì toang
        // nên dùng async await để đợi thằng dispatch call API xong mới navigate
        // bên trong hàm dispatch nhớ dùng try catch ko dc dùng .then().catch() sẽ ko chạy dc

        const token = localStorage.getItem('userToken')
        if (token) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1900,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Đăng nhập thành công !'
            })
            navigate('/')
        }
        else setErrorInfo({ taiKhoan: "Vui lòng kiểm tra lại tài khoản", matKhau: "Vui lòng kiểm tra lại mật khẩu" })
    }

    return (
        <AuthLayout >
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
                    <div className="mt-6 px-12   lg:px-12  max-w-sm mx-auto shadow-2xl py-4 rounded-xl">
                        <h2 className="text-center text-2xl text-orange-600 font-display font-semibold   xl:text-3xl
          xl:text-bold">{t('Đăng nhập')}</h2>
                        <div className="mt-8">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Tài khoản')}</div>
                                    <input className="w-full  text-sm py-1 border-b border-gray-300 focus:outline-none focus:border-orange-600"
                                        type
                                        name='taiKhoan'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='giahuy4'
                                    />
                                    {errorInfo.taiKhoan && <span className='text-red-600 text-xs'  >{t(`${errorInfo.taiKhoan}`)}</span>}
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            {t('Mật khẩu')}
                                        </div>
                                    </div>
                                    <input className="w-full  text-sm py-1  border-b border-gray-300 focus:outline-none focus:border-orange-600 "
                                        name='matKhau'
                                        type='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='123456'
                                    />
                                    {errorInfo.matKhau && <span className='text-red-600 text-xs' >{t(`${errorInfo.matKhau}`)}</span>}
                                </div>
                                <div className="mt-10">
                                    <button

                                        type='submit'
                                        className="bg-orange-600 text-gray-100 p-2.5 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-orange-700
                      shadow-lg duration-300">
                                        {t('Đăng nhập')}
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
                                {t('Bạn chưa có tài khoản ?')} <NavLink to='/signup' className="cursor-pointer text-orange-600 hover:text-orange-700">{t('Đăng ký')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AuthLayout>
    );
};

export default Signin;