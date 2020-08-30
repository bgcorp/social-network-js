import React from 'react';
import styles from './FormsControls.module.css';
import { Field } from 'redux-form';


const FormControl = ({ input, meta: { touched, error }, children, ...props }) => {

    const hasError = touched && error;

    return <div className={styles.formControl + ' ' + (hasError && styles.error)}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export const createField = (name, placeholder, component, validators, props = {}, text = '') => {
    return <div>
        <Field name={name} placeholder={placeholder} component={component} validate={validators} {...props} />
        {text}
    </div>
}

export const createErrorBlock = (error) => {
    return <div className={styles.formSummaryError}>
        {error}
    </div>
}