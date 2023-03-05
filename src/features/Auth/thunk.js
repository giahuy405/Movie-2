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
        localStorage.setItem('userToken', res.data.content.accessToken);
        dispatch({
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
        dispatch({
            type: HIDDEN_LOADDING
        })
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
        await dispatch({
            // type giống với mục login vì để đẩy dữ liệu user lên reducer 
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
    } catch (err) {
        console.log(err)
    }
}

 

export const postSignUp = data => async(dispatch) => {
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