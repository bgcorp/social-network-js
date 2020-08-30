import { userApi, profileApi } from '../api/api';
import { stopSubmit } from 'redux-form';


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        { id: '1', message: 'It\'s my first post', likesCount: '10' },
        { id: '2', message: 'Hi, how are you?', likesCount: '23' }
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let postBody = {
                id: 3,
                message: action.postBody,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, postBody]
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            };

        default:
            return state;
    }

}


export const addPost = (postBody) => ({ type: ADD_POST, postBody });


const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });
const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });



export const getUserProfile = (userId) => async (dispatch) => {
    let response = await userApi.userProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileApi.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const changeStatus = (status) => async (dispatch) => {
    let response = await profileApi.changeStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (photoFile) => async (dispatch) => {
    let response = await profileApi.savePhoto(photoFile);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfileData = (profileData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileApi.saveProfileData(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('profileData', { 'contacts': { 'facebook': response.data.messages[0] } }));
        return Promise.reject();
    }
}



export default profileReducer;