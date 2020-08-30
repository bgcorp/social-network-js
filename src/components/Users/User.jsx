import React from 'react';
import styles from './Users.module.css';
import userPhoto from './../../assets/images/user.png';
import { NavLink } from 'react-router-dom';


const User = ({ user, followingProgress, unfollow, follow }) => {

    return <div>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img className={styles.photoUser} src={user.photos.small != null ? user.photos.small : userPhoto} />
            </NavLink>
        </div>
        <div>
            {user.followed
                ? <button disabled={followingProgress.some(id => id === user.id)}
                    onClick={() => { unfollow(user.id); }}
                >unfollow</button>
                : <button disabled={followingProgress.some(id => id === user.id)}
                    onClick={() => { follow(user.id); }}
                >follow</button>}
        </div>
        <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>{'u.location.country'}</div>
            <div>{'u.location.city'}</div>
        </div>
    </div>
}


export default User;