const SEND_MESSAGE = 'SEND_MESSAGE';


let initialState = {
    dialogs: [
        { id: '1', name: 'Bekzat' },
        { id: '2', name: 'Admin' }
    ],
    messages: [
        { id: '1', message: 'Hi' },
        { id: '2', message: 'Hello' }
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let messageBody = {
                id: 3,
                message: action.message
            };

            return {
                ...state,
                messages: [...state.messages, messageBody]
            };
        default:
            return state;
    }

}


export const sendMessage = (message) => ({ type: SEND_MESSAGE, message });


export default dialogsReducer;