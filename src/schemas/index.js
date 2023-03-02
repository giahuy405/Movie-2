import * as yup from 'yup';

const passwordRegex = /^[0-9]{5,10}$/;
// const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const fullnameRegex = /^([A-Z][a-z]*([\s]|$)){2,3}$/;
const usernameRegex = /^[a-zA-Z0-9]{5,15}$/;

export const advanceSchema = yup.object().shape({
    taiKhoan: yup
        .string()
        .min(5, 'Tài khoản phải có ít nhất 5 kí tự')
        // .matches(usernameRegex, { message: "Tài khoản phải có cả kí tự và số" })
        .required('Vui lòng nhập tài khoản'),
    maNhom: yup
        .string()
        .oneOf(['GP01', 'GP02', 'GP03', 'GP04', 'GP05', 'GP06', 'GP07'], null)
        .required('Vui lòng chọn nhóm'),
    matKhau: yup
        .string()
        .min(6, 'Mật khẩu từ 6-15 kí tự')
        // .matches(passwordRegex, { message: "Vui lòng nhập mật khẩu mạnh hơn" })
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
        .string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([yup.ref('matKhau'), null], 'Mật khẩu không giống nhau')
    ,
    email: yup
        .string()
        .email("Email không đúng định dạng")
        .required('Vui lòng nhập email'),
    soDt: yup
        .number()
        // .matches(phoneRegex, { message: "Số điện thoại không hợp lệ" })
        .required('Vui lòng nhập số điện thoại'),
    hoTen: yup
        .string()
        // .matches(fullnameRegex, { message: "Họ và tên không hợp lệ" })
        .required('Vui lòng nhập họ tên'),

})
