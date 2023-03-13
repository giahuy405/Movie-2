import { https } from "../../../serivce/config";
export const adminService = {
    fetchMoviesAdmin: (groupID, name) => {
        if (name.trim() === '') {
            return https.get('QuanLyPhim/LayDanhSachPhim', {
                params: {
                    maNhom: groupID,
                }
            })
        }
        return https.get('QuanLyPhim/LayDanhSachPhim', {
            params: {
                maNhom: groupID,
                tenPhim: name
            }
        })
    },
    uploadImageAdmin: (formData) => https.post('QuanLyPhim/ThemPhimUploadHinh', formData),

    getMovieDetailAdmin: (maPhim) => https.get('QuanLyPhim/LayThongTinPhim', {
        params: {
            maPhim
        }
    }),
    updateFilms: (formData) => https.post('QuanLyPhim/CapNhatPhimUpload', formData),
    deleteFilm: (id) => https.delete('QuanLyPhim/XoaPhim', {
        params: {
            maPhim: id
        }
    }),
    getInfoTheaterAdmin: () => https.get('QuanLyRap/LayThongTinHeThongRap'),
    getInfoCinemaCluster: (maHeThongRap) => https.get('QuanLyRap/LayThongTinCumRapTheoHeThong', {
        params: {
            maHeThongRap
        }
    }),
    postShowTimes: (lich) => {
        const url = 'QuanLyDatVe/TaoLichChieu';
        console.log('lich',lich)
        return https.post(url, lich,
            {
                headers: {
                    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzOCIsIkhldEhhblN0cmluZyI6IjA2LzA4LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5MTI4MDAwMDAwMCIsIm5iZiI6MTY2MjM5NzIwMCwiZXhwIjoxNjkxNDI3NjAwfQ.66mNB20qUNFA8TlIzjAq7Ekv1hVfR3hQB4I3_yLui8Y',
                    Authorization: "Bearer " + localStorage.getItem('userToken')
                },
                
            })
    },

}