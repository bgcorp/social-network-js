import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, savePhoto, isOwner, status, changeStatus, saveProfileData }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onChangeMainPhoto = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSaveProfileData = (formData) => {
        saveProfileData(formData)
            .then(() => {
                setEditMode(false);
            });
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <div>
                        <img src={profile.photos.small || userPhoto} />
                    </div>
                    {isOwner &&
                        <div>
                            <input type='file' onChange={onChangeMainPhoto} />
                        </div>}
                </div>

                {!editMode
                    ? <ProfileData profile={profile} setEditMode={setEditMode} />
                    : <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSaveProfileData} />}

                <ProfileStatusWithHooks status={status} changeStatus={changeStatus} />
            </div>
        </div>
    )
}


const ProfileData = ({ profile, setEditMode }) => {

    return <div>

        <div>
            <button onClick={() => { setEditMode(true) }}>Edit</button>
        </div>
        <div>
            <b>Name</b>: {profile.fullName}
        </div>

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>

        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                <b>lookingForAJobDescription</b>: {profile.lookingForAJobDescription}
            </div>
        }

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).filter(c => profile.contacts[c] != null)
                .map((key) => {
                    return <Contact key={key} contactKey={key} contactValue={profile.contacts[key]} />
                })}
        </div>
    </div>
}



const Contact = ({ contactKey, contactValue }) => {
    return <div className={s.contact}>
        <b>{contactKey}</b>: {contactValue}
    </div>
}

export default ProfileInfo;