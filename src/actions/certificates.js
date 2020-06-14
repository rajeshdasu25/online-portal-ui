import { FETCH_IND_CERTIFICATE, FETCH_ALL_CERTIFICATES, ADD_NEW_CERTIFICATE, INSERTION_ERROR } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchCertificates = (certificates) => {
    return {
        type: FETCH_ALL_CERTIFICATES,
        certificates
    }
};

export const fetchCertificate = (certificate) => {
    return {
        type: FETCH_IND_CERTIFICATE,
        certificate
    }
};

export const addCertificate = (certificate) => {
    return {
        type: ADD_NEW_CERTIFICATE,
        certificate
    }
};

export const insertionError = (insertionErrorMessage) => {
    return {
        type: INSERTION_ERROR,
        insertionErrorMessage
    }
};

export const fetchAllCertificates = () => {
    return (dispatch) => {
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=certificates';//FETCH_ALL_CERTIFICATES_URL;
        return axios.get(url)
            .then(response => {
                dispatch(fetchCertificates(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchACertificate = (certId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_A_CERTIFICATE_URL;
        return axios.get(url)
            .then(response => {
                dispatch(fetchCertificate(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewCertificate = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_AN_ITEM_URL + '?type=certificates';
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
                        dispatch(insertionError('Certification already exists..!!!'));
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