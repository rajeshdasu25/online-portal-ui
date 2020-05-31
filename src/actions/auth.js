import { AUTH_ERROR, CHECK_USER_LOGIN, FETCH_LOGIN_USER } from './types';
// import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const userLogin = (loginUserId) => {
    return {
        type: CHECK_USER_LOGIN,
        loginUserId
    }
};

export const fetchLogUser = (loginUser) => {
    return {
        type: FETCH_LOGIN_USER,
        loginUser
    }
};

export const authError = (loginErrorMessage) => {
    return {
        type: AUTH_ERROR,
        loginErrorMessage
    }
};

export const checkUserLogin = (formData) => {
    return (dispatch) => {
        //let url = 'https://onlineportalservices.appspot.com/api/login';
        let url = appConstants.USER_LOGIN_URL;
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(
            url,
            formData,
            { body: JSON.stringify(formData) },
            { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.userValidity === "VALID_USER") {
                        localStorage.setItem('loginUserId', JSON.stringify(response.data.userId));
                        localStorage.setItem('loginSsoId', JSON.stringify(response.data.ssoId));
                        localStorage.setItem('loginUserType', JSON.stringify(response.data.userTypeId));
                        localStorage.setItem('loginUserRoleId', JSON.stringify(response.data.userRoleId));
                        let loginUser = {
                            'type': response.data.userTypeId,
                            'id': response.data.userId,
                            'sso': response.data.ssoId,
                            'role': response.data.userRoleId
                        };
                        localStorage.setItem('loginUser', loginUser);
                        dispatch(userLogin(response.data.ssoId));
                    } else if (response.data.userValidity === "WRONG_PWD") {
                        dispatch(authError('Incorrect Password.!'));
                    } else if (response.data.userValidity === "NOT_EXIST") {
                        dispatch(authError('User does not exist.!'));
                    } else if (response.data.userValidity === "ACCESS_DENIED") {
                        dispatch(authError('User is not active.!'));
                    }
                }
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchLoginUser = (ssoId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?type=users&ssoId=' + ssoId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchLogUser(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};