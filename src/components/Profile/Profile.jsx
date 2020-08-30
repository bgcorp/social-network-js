import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo isOwner={props.isOwner} savePhoto={props.savePhoto}
                profile={props.profile} status={props.status} changeStatus={props.changeStatus}
                saveProfileData={props.saveProfileData} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;