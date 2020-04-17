import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthenticateRoute = ({ component: Component, ...rest }) => {
    const loginUserId = localStorage.getItem('loginUserId');
    const isLoggedIn = (localStorage.hasOwnProperty('loginUserId') && (loginUserId !== 'null')) ? true : false;
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? ( <Component {...props} /> ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default AuthenticateRoute