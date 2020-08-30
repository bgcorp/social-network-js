import { createSelector } from 'reselect';

/* reselect
export const getUsers1 = (state) => {
    return state.usersPage.users;
}
export const getUsers = createSelector(getUsers1, (users)=>{
    return users.filter(u=>true);
})
*/

export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getFollowingProgress = (state) => {
    return state.usersPage.followingProgress;
}