import { AuthService } from "./services/authService";
import * as actionTypes from './constants'
import { DISPLAY_LOADING, HIDDEN_LOADDING } from '../Booking/constants'
export const postLoginInfo = data => async (dispatch) => {
    try {
        // hiện loading khi đăng nhập * slow 3G
        dispatch({
            type: DISPLAY_LOADING
        })
        const res = await AuthService.signIn(data);
        dispatch({
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
        console.log(res.statusCode)
        dispatch({
            type: HIDDEN_LOADDING
        })
        localStorage.setItem('userToken', res.data.content.accessToken);

    } catch (err) {
        console.log(err);
        dispatch({
            type: HIDDEN_LOADDING
        })
    }
}

export const fetchProfile = async (dispatch) => {
    try {
        const res = await AuthService.fetchProfile();
        console.log('thunk', res.data.content)
        await dispatch({
            // type giống với mục login vì để đẩy dữ liệu user lên reducer 
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
    } catch (err) {
        console.log(err)
    }
}


export const postSignUp = data => async (dispatch) => {
    try {
        const res = await AuthService.signUp(data);
        if(res.statusCode===400){
            alert(res.content)
        }
    } catch (err) {
        console.log(err);
    }
}

export const updateUser = data => async (dispatch) => {
    try {
        const res = await AuthService.updateUser(data);
     
    } catch (err) {
        console.log(err);
    }
}