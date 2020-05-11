import { FETCH_IND_FORM, FETCH_ALL_FORMS, ADD_NEW_FORM } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchForms = (forms) => {
    return {
        type: FETCH_ALL_FORMS,
        forms
    }
};

export const fetchForm = (indForm) => {
    return {
        type: FETCH_IND_FORM,
        indForm
    }
};

export const addForm = (form) => {
    return {
        type: ADD_NEW_FORM,
        form
    }
};

export const fetchAllForms = (user) => {
    return (dispatch) => {
        // let userCondition = (user !== undefined) ? '&userType=' + user.type+ '&userId=' + user.id : '';
        // let url = appConstants.GET_ALL_ITEMS_URL + '?type=forms' + userCondition;
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=forms';
        return axios.get(url)
            .then(response => {
                dispatch(fetchForms(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchAForm = (formId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?id=' + formId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchForm(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewForm = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_NEW_CERTIFICATE_URL;
        let headers = {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(url, formData, { headers : headers })
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