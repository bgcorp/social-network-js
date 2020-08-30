import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.changeStatus(status)
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    }


    return (
        <div>
            <b>Status</b>:
            {editMode
                ? <input onChange={onChangeStatus} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                : <span onDoubleClick={activateEditMode}>{props.status ? props.status : '---'}</span>
            }
        </div>
    )

}

export default ProfileStatusWithHooks;