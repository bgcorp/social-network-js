import React from 'react';
import { connect } from "react-redux";
import {
    follow,
    unfollow,
    requestUsers
} from '../../redux/users-reducer';
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import {
    getUsers,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingProgress
} from '../../redux/users-selectors';



class UsersContainer extends React.Component {

    componentDidMount = () => {
        this.props.requestUsers(this.props.pageSize, this.props.currentPage);
    }

    onChangeCurrentPage = (pageNumber) => {
        this.props.requestUsers(this.props.pageSize, pageNumber);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onChangeCurrentPage={this.onChangeCurrentPage}
                followingProgress={this.props.followingProgress}
            /></>
    }
}


let mapStateToProps = (state) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state)
});

export default connect(mapStateToProps, { follow, unfollow, requestUsers })(UsersContainer);