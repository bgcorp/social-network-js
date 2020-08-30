import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength20 = maxLength(20);

let AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='post' component={Textarea} validate={[required, maxLength20]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

AddPostForm = reduxForm({ form: 'addPost' })(AddPostForm);

const MyPosts = props => {

    let postsElements = [...props.profilePage.posts]
        .reverse().map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />)

    let addPost = (values) => {
        props.addPost(values.post);
    }

    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <AddPostForm onSubmit={addPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;