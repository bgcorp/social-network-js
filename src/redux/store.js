import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: '1', message: 'Hi, how are you?', likesCount: '10' },
                { id: '2', message: 'It\'s my first post', likesCount: '23' }
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: '1', name: 'Bekzat' },
                { id: '2', name: 'Admin' }
            ],
            messages: [
                { id: '1', message: 'Hi' },
                { id: '2', message: 'Hello' }
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubcriber() {
        console.log("empty");
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubcriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubcriber(this._state);


    }

}



export default store;