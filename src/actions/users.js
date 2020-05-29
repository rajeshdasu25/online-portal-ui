import { FETCH_IND_USER, FETCH_ALL_USERS, ADD_NEW_USER } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchUsers = (users) => {
    return {
        type: FETCH_ALL_USERS,
        users
    }
};

export const fetchUser = (user) => {
    return {
        type: FETCH_IND_USER,
        user
    }
};

export const addUser = (user) => {
    return {
        type: ADD_NEW_USER,
        user
    }
};

export const fetchAllUsers = (user) => {
    return (dispatch) => {
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=users';
        return axios.get(url)
            .then(response => {
                dispatch(fetchUsers(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchAUser = (userId) => { console.log('userId: ', userId);
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?type=users&id=' + userId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchUser(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewUser = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_AN_ITEM_URL + '?type=users';
        let headers = {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(
            url, formData,
            { body: JSON.stringify(formData) },
            { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    dispatch(setStatus(false));
                }
            })
            .catch(error => {
                throw (error);
            });
    };
};