import React from 'react';

export const required = value => (value || typeof value === 'number' ? undefined : 'This field is Required');

export const maxLength = max => value =>
    value && value.length > max ? `Maximum ${max} characters only allowed` : undefined;
export const maxLength9 = maxLength(9);
export const maxLength15 = maxLength(15);

export const minLength = min => value =>
    value && value.length < min ? `Must be atleast ${min} characters` : undefined;
export const minLength2 = minLength(2);
export const minLength9 = minLength(9);

export const specifiedLength = len => value =>
    value && value.length !== len ? `Must be ${len} characters only` : undefined;
export const specifiedLength9 = specifiedLength(9);

export const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
export const minValue13 = minValue(13);

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const tooYoung = value =>
    value && value < 13
        ? 'You do not meet the minimum age requirement!'
        : undefined;

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined;

export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined

export const renderField = ({
    input, placeholder, className, type,
    meta: { touched, error, warning }
}) => (
    <div>
        <input {...input} placeholder={placeholder} type={type} className={className} />
        {touched &&
            ((error && <span className="text-danger">{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>
)

export const renderSelectField = ({
    input, className,
    meta: { touched, error, warning },
    children
}) => (
    <div>
        <div>
            <select {...input} className={className} >
                {children}
            </select>
            {touched &&
                ((error && <span className="text-danger">{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
)