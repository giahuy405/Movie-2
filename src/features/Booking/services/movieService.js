import { https } from "../../../serivce/config"
export const movieService = {
    getBanners: () => https.get('QuanLyPhim/LayDanhSachBanner?maNhom=GP03'),
    getMoviesPagination: (soTrang) => https.get('QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP03', {
        params: {
            soTrang,
            soPhanTuTrenTrang: 8
        }
    }),
    getTabs: () => https.get('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP04'),
    getScheduleDetail: (id) => {
        const url = 'QuanLyDatVe/LayDanhSachPhongVe'
        return https.get(url, {
            params: {
                MaLichChieu: id
            }
        })
    },
    // lấy thông tin phim cho trang chi tiết
    getDetailMovie: (id) => {
        const url = `QuanLyRap/LayThongTinLichChieuPhim`
        return https.get(url, {
            params: {
                MaPhim: id
            }
        })
    },
    getListSeats: (id) => {
        const url = `QuanLyDatVe/LayDanhSachPhongVe`
        return https.get(url, {
            params: {
                MaLichChieu: id
            }
        })
    },
    // post dữ
    postBookTicket: (infoBook) =>{
        const url = `QuanLyDatVe/DatVe`
        return https.post(url,infoBook)
    }
}