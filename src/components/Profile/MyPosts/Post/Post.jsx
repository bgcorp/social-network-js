import React from 'react';
import s from './Post.module.css';
import logo from '../../../../assets/images/logo.PNG'


const Post = (props) => {

    return (
        <div className={s.item}>
            <img src={logo} />
            {props.message}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;