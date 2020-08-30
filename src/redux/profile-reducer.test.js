import { addPost } from './profile-reducer';
const { default: profileReducer } = require("./profile-reducer");

let state = {
    posts: [
        { id: '1', message: 'It\'s my first post', likesCount: '10' },
        { id: '2', message: 'Hi, how are you?', likesCount: '23' }
    ]
};

test('add new post', () => {

    let newPost = 'new';
    
    let newState = profileReducer(state, addPost(newPost));
    expect(newState.posts.length).toBe(3);
});