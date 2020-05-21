import { AUTH_ERROR, CHECK_USER_LOGIN, FETCH_LOGIN_USER } from './types';
// import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

// export const fetchUsers = (users) => {
//     return {
//         type: FETCH_ALL_CERTIFICATES,
//         users
//     }
// };

// export const fetchUser = (user) => {
//     return {
//         type: FETCH_IND_CERTIFICATE,
//         user
//     }
// };

// export const addUser = (user) => {
//     return {
//         type: ADD_NEW_CERTIFICATE,
//         user
//     }
// };

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

// export const fetchAllUsers = () => {
//     return (dispatch) => {
//         let url = appConstants.FETCH_ALL_CERTIFICATES_URL;
//         return axios.get(url)
//             .then(response => {
//                 dispatch(fetchUsers(response.data));
//             })
//             .catch(error => {
//                 throw (error);
//             });
//     };
// };

// export const fetchAUser = (certId) => {
//     return (dispatch) => {
//         const url = appConstants.FETCH_A_CERTIFICATE_URL;
//         return axios.get(url)
//             .then(response => {
//                 dispatch(fetchUser(response.data));
//             })
//             .catch(error => {
//                 throw (error);
//             });
//     };
// };

// export const addNewUser = (formData) => {
//     return (dispatch) => {
//         let url = appConstants.ADD_NEW_CERTIFICATE_URL;
//         let headers = {
//             'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
//         };
//         return axios.post(url, formData, { headers : headers })
//             .then(response => {
//                 if (response.status === 200) {
//                     dispatch(setStatus(false));
//                 }
//             })
//             .catch(error => {
//                 throw (error);
//             });
//     };
// };

export const checkUserLogin = (formData) => {
    return (dispatch) => {
        //let url = 'https://onlineportalservices.appspot.com/api/login';
        let url = appConstants.USER_LOGIN_URL;// + '?Username=' + formData.Username + '&Password=' + formData.Password;
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
                        let loginUser = {
                            'type': response.data.userTypeId,
                            'id': response.data.userId,
                            'sso': response.data.ssoId
                        };
                        localStorage.setItem('loginUser', loginUser);
                        // dispatch(userLogin(response.data.userId));
                        dispatch(userLogin(response.data.ssoId));
                    } else if (response.data.userValidity === "WRONG_PWD") {
                        dispatch(authError('Incorrect Password.!'));
                    } else if (response.data.userValidity === "NOT_EXIST") {
                        dispatch(authError('User does not exist.!'));
                    } else if (response.data.userValidity === "ACCESS_DENIED") {
                        dispatch(authError('User not active.!'));
                    }
                }
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchLoginUser = (userId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?type=users&id=' + userId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchLogUser(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};