import { authApi, securityApi } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}


const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: { userId, login, email, isAuth }
});

const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authApi.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }

    return response;
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityApi.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(response.data.url));
}

export const logout = () => async (dispatch) => {
    let response = await authApi.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;