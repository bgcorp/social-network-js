import { userApi } from '../api/api';
import { updateObjectInArray } from '../utils/helpers/object-helpers';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SETUSERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            };

        case SETUSERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : [state.followingProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }

}



export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

const followSuccess = (userId) => ({ type: FOLLOW, userId });
const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
const setUsers = (users) => ({ type: SETUSERS, users });
const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber });
const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const requestUsers = (pageSize, page) => async (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(toggleIsFetching(true));
    let data = await userApi.getUsers(pageSize, page);
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setUsers(data.items));
    dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, userId));

    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const follow = (userId) => (dispatch) => {
    followUnfollowFlow(dispatch, userId, userApi.follow.bind(userApi), followSuccess);
}

export const unfollow = (userId) => (dispatch) => {
    followUnfollowFlow(dispatch, userId, userApi.unfollow.bind(userApi), unfollowSuccess);
}


export default usersReducer;