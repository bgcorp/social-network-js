import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLength, required } from '../../utils/validators/validators';

const maxLength20 = maxLength(20);


let AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name='message' placeholder='write your message' component={Textarea}
                validate={[required, maxLength20]} />
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>

}

AddMessageForm = reduxForm({ form: 'addMessage' })(AddMessageForm);



const Dialogs = (props) => {

    let dialogsPage = props.dialogsPage;

    let dialogsElements = dialogsPage.dialogs.map(d => <Dialog id={d.id} name={d.name} key={d.id} />)
    let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />)


    const sendMessage = (values) => {
        props.sendMessage(values.message);
    }


    return <div className={s.dialogs}>
        <div className={s.dialogItems}>
            {dialogsElements}
        </div>
        <div className={s.messages}>
            {messagesElements}
            <AddMessageForm onSubmit={sendMessage} />
        </div>
    </div>

}

export default Dialogs;