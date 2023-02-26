import { https } from "../../../serivce/config";

export const AuthService = {
    signIn: (data) => {
        const url = 'QuanLyNguoiDung/DangNhap';
        return https.post(url,data)
    },
    // fetchProfile để lấy thoogn tin người dùng nếu họ đã đăng nhập trước đó rồi. ( lưu dưới localStorage giờ lấy lên dùng)
    fetchProfile:() =>{
        const url ='QuanLyNguoiDung/ThongTinTaiKhoan';
        return https.post(url)
    }
}