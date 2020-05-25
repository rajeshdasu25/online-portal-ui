import { createBrowserHistory } from 'history';
import { FETCH_IND_ROLE, FETCH_ALL_ROLES, ADD_NEW_ROLE } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const browserHistory = createBrowserHistory();

export const fetchRoles = (roles) => {
    return {
        type: FETCH_ALL_ROLES,
        roles
    }
};

export const fetchRole = (indRole) => {
    return {
        type: FETCH_IND_ROLE,
        indRole
    }
};

export const addRole = (role) => {
    return {
        type: ADD_NEW_ROLE,
        role
    }
};

export const fetchAllRoles = (user) => {
    return (dispatch) => {
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=roles';
        return axios.get(url)
            .then(response => {
                dispatch(fetchRoles(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchARole = (roleId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?id=' + roleId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchRole(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewRole = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_NEW_ITEM_URL + '?type=roles';
        let headers = {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(url, formData, { headers : headers })
            .then(response => {
                if (response.status === 200) {
                    dispatch(setStatus(false));
                }
            })
            .then(() => {
                browserHistory.push('/');
                browserHistory.push('/roles');
            })
            .catch(error => {
                throw (error);
            });
    };
};