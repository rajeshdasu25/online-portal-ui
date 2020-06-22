import { FETCH_IND_PROFICIENCY, FETCH_ALL_PROFICIENCIES, ADD_NEW_PROFICIENCY, INSERTION_ERROR } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchProficiencies = (proficiencies) => {
    return {
        type: FETCH_ALL_PROFICIENCIES,
        proficiencies
    }
};

export const fetchProficiency = (proficiency) => {
    return {
        type: FETCH_IND_PROFICIENCY,
        proficiency
    }
};

export const addProficiency = (proficiency) => {
    return {
        type: ADD_NEW_PROFICIENCY,
        proficiency
    }
};

export const insertionError = (insertionErrorMessage) => {
    return {
        type: INSERTION_ERROR,
        insertionErrorMessage
    }
};

export const fetchAllProficiencies = () => {
    return (dispatch) => {
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=proficiencies';
        return axios.get(url)
            .then(response => {
                dispatch(fetchProficiencies(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchAProficiency = (profId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?id=' + profId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchProficiency(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewProficiency = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_AN_ITEM_URL + '?type=proficiencies';
        let headers = {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(
            url, formData,
            { body: JSON.stringify(formData) },
            { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.insertStatus === "ALREADY_EXIST") {
                        dispatch(insertionError('Proficiency already exists..!!!'));
                    } else {
                        dispatch(setStatus(false));
                    }
                }
            })
            .catch(error => {
                throw (error);
            });
    };
};