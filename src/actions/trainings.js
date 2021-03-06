import { createBrowserHistory } from 'history';
import { FETCH_IND_TRAINING, FETCH_ALL_TRAININGS, ADD_NEW_TRAINING, INSERTION_ERROR } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const browserHistory = createBrowserHistory();

export const fetchTrainings = (trainings) => {
    return {
        type: FETCH_ALL_TRAININGS,
        trainings
    }
};

export const fetchTraining = (training) => {
    return {
        type: FETCH_IND_TRAINING,
        training
    }
};

export const addTraining = (training) => {
    return {
        type: ADD_NEW_TRAINING,
        training
    }
};

export const insertionError = (insertionErrorMessage) => {
    return {
        type: INSERTION_ERROR,
        insertionErrorMessage
    }
};

export const fetchAllTrainings = () => {
    return (dispatch) => {
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=trainings';
        return axios.get(url)
            .then(response => {
                dispatch(fetchTrainings(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchATraining = (certId) => {
    return (dispatch) => {
        const url = appConstants.ADD_NEW_CERTIFICATE_URL;
        return axios.get(url)
            .then(response => {
                dispatch(fetchTraining(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewTraining = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_AN_ITEM_URL + '?type=trainings';
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return axios.post(
            url, formData,
            { body: JSON.stringify(formData) },
            { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.insertStatus === "ALREADY_EXIST") {
                        dispatch(insertionError('Training already exists..!!!'));
                    } else {
                        dispatch(setStatus(false));
                    }
                }
            })
            .then(() => {
                browserHistory.push('/');
                browserHistory.push('/trainings');
            })
            .catch(error => {
                throw (error);
            });
    };
};