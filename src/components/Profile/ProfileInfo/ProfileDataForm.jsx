import React from 'react';
import { reduxForm } from 'redux-form'
import {
    createField,
    Input,
    Textarea,
    createErrorBlock
} from '../../common/FormsControls/FormsControls';


let ProfileDataForm = ({ profile, handleSubmit, error }) => {
    return <form onSubmit={handleSubmit}>

        <div>
            <button>Save</button>
        </div>

        {createErrorBlock(error)}

        <div>
            <b>Name</b>: {createField('fullName', 'fullName', Input, [])}
        </div>

        <div>
            <b>About me</b>: {profile.aboutMe} {createField('aboutMe', 'aboutMe', Textarea, [])}
        </div>

        <div>
            <b>Looking for a job</b>:  {createField('lookingForAJob', null, Input, null, { type: 'checkbox' })}
        </div>

        <div>
            <b>lookingForAJobDescription</b>: {createField('lookingForAJobDescription', 'lookingForAJobDescription', Textarea, [])}
        </div>

        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
                return <div>
                    <b>{key}</b>: {createField('contacts.' + key, key, Input, [])}
                </div>
            })}
        </div>
    </form>
}

ProfileDataForm = reduxForm({ form: 'profileData' })(ProfileDataForm)

export default ProfileDataForm;
