import { createBrowserHistory } from 'history';
import { FETCH_IND_RESPONSE, FETCH_FILTER_RESPONSE, FETCH_ALL_RESPONSES, ADD_NEW_RESPONSE } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const browserHistory = createBrowserHistory();

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

export const fetchFilterReponse = (filterResponse) => {
    return {
        type: FETCH_FILTER_RESPONSE,
        filterResponse
    }
};

export const addForm = (response) => {
    return {
        type: ADD_NEW_RESPONSE,
        response
    }
};

export const fetchFilterResponses = (formData) => {
    return (dispatch) => {
        let url = appConstants.GET_FILTER_RESPONSE_URL;
        let headers = {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(url, formData, { headers : headers })
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchFilterReponse(response.data));
                }
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchAllResponses = (ssoId) => {
    return (dispatch) => {
        let userCondition = (ssoId !== undefined) ? '&ssoId=' + ssoId : '';
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=responses' + userCondition;
        // let url = appConstants.GET_ALL_ITEMS_URL + '?type=responses' + userCondition;
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
        let url = appConstants.ADD_AN_ITEM_URL + '?type=responses';
        let headers = {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(
            url, formData,
            { body: JSON.stringify(formData) },
            { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    //dispatch(setStatus(false));
                    browserHistory.push('/responses');
                }
            })
            .catch(error => {
                throw (error);
            });
    };
};