import { AuthService } from "./services/authService";
import * as actionTypes from './constants'

export const postLoginInfo = data => async (dispatch) => {
    try {
        const res = await AuthService.signIn(data);
        dispatch({
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
        localStorage.setItem('userToken', res.data.content.accessToken);

    } catch (err) {
        console.log(err)
    }
}

export const fetchProfile = async (dispatch) => {
    try {
        const res = await AuthService.fetchProfile();
        dispatch({
            // type giống với mục login vì để đẩy dữ liệu user lên reducer 
            type: actionTypes.POST_LOGIN_INFO,
            payload: res.data.content
        })
    } catch (err) {
        console.log(err)
    }
}