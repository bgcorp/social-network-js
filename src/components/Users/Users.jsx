import React from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';


const Users = ({ totalUsersCount, pageSize, currentPage, onChangeCurrentPage, users, ...props }) => {

    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onChangeCurrentPage={onChangeCurrentPage} />

        {users.map(u => <User user={u} followingProgress={props.followingProgress}
            unfollow={props.unfollow} follow={props.follow} key={u.id} />)}
    </div>
}


export default Users;