import Swal from 'sweetalert2';
import * as actionTypes from './constants'
import { adminService } from './services/adminServices';

export const fetchMoviesAdmin = (groupID, name = '') => async (dispatch) => {
    try {
        const res = await adminService.fetchMoviesAdmin(groupID, name);
        dispatch({
            type: actionTypes.FETCH_MOVIES_ADMIN,
            payload: res.data.content
        })
    } catch (err) {
        console.log(err)
    }
}
export const uploadImage = formData => async (dispatch) => {
    try {
        const res = await adminService.uploadImageAdmin(formData);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: `Thêm phim thành công !`
        })
    } catch (err) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2400,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            title: `Phim đã tồn tại !`
        })
        console.log(err)
    }
}

export const getMovieDetailAdmin = maPhim => async (dispatch) => {
    try {
        const res = await adminService.getMovieDetailAdmin(maPhim);
        dispatch({
            type: actionTypes.GET_MOVIE_DETAIL,
            payload: res.data.content
        })
    } catch (err) {
        console.log(err)
    }
}
export const updateFilmsAdmin = formData => async (dispatch) => {
    try {
        const res = await adminService.updateFilms(formData);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: `Cập nhật phim thành công !`
        })
    } catch (err) {
        console.log(err.response.data.content)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'error',
            title: `${err.response.data.content} !`
        })
    }
}

export const deleteFilmAdmin = id => async (dispatch) => {
    try {
        const res = await adminService.deleteFilm(id);

    } catch (err) {
        console.log(err)

    }
}
 