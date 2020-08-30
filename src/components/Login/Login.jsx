import React from 'react';
import { reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators';
import { Input, createField, createErrorBlock } from '../common/FormsControls/FormsControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';


let LoginForm = ({ handleSubmit, error, captchaUrl }) => {

    return <form onSubmit={handleSubmit}>
        {createField('email', 'email', Input, [required])}
        {createField('password', 'password', Input, [required], { type: 'password' })}
        {createField('rememberMe', null, Input, null, { type: 'checkbox' }, 'Remember me')}
        {createErrorBlock(error)}

        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField('captcha', 'captcha', Input, [required])}

        <div>
            <button>Login</button>
        </div>
    </form>
}

LoginForm = reduxForm({ form: 'login' })(LoginForm)



const Login = (props) => {

    let onLogin = (values) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha);
    }

    if (props.isAuth) return <Redirect to='/profile' />

    return <div>
        <h1>login</h1>
        <LoginForm onSubmit={onLogin} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);