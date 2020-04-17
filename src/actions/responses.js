import { FETCH_IND_RESPONSE, FETCH_ALL_RESPONSES, ADD_NEW_RESPONSE } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchResponses = (responses) => {
    return {
        type: FETCH_ALL_RESPONSES,
        responses
    }
};

export const fetchResponse = (response) => {
    return {
        type: FETCH_IND_RESPONSE,
        response
    }
};

export const addForm = (response) => {
    return {
        type: ADD_NEW_RESPONSE,
        response
    }
};

export const fetchAllResponses = (user) => {
    return (dispatch) => {
        let userCondition = (user !== undefined) ? '&userType=' + user.type+ '&userId=' + user.id : '';
        let url = appConstants.GET_ALL_ITEMS_URL + '?type=responses' + userCondition;
        return axios.get(url)
            .then(response => {
                dispatch(fetchResponses(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchAResponse = (respId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?id=' + respId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchResponse(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewResponse = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_AN_ITEM_URL;
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