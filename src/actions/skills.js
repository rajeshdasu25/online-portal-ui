import { FETCH_IND_SKILL, FETCH_ALL_SKILLS, ADD_NEW_SKILL, INSERTION_ERROR } from './types';
import { setStatus } from './modal';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchSkills = (skills) => {
    return {
        type: FETCH_ALL_SKILLS,
        skills
    }
};

export const fetchSkill = (indSkill) => {
    return {
        type: FETCH_IND_SKILL,
        indSkill
    }
};

export const addSkill = (skill) => {
    return {
        type: ADD_NEW_SKILL,
        skill
    }
};

export const insertionError = (insertionErrorMessage) => {
    return {
        type: INSERTION_ERROR,
        insertionErrorMessage
    }
};

export const fetchAllSkills = (roleId) => {
    return (dispatch) => {
        let roleCondition = (roleId !== undefined) ? '&roleId=' + roleId : '';
        let url = appConstants.FETCH_ALL_ITEMS_URL + '?type=skills' + roleCondition;
        return axios.get(url)
            .then(response => {
                dispatch(fetchSkills(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchASkill = (skillId) => {
    return (dispatch) => {
        const url = appConstants.FETCH_AN_ITEM_URL + '?id=' + skillId;
        return axios.get(url)
            .then(response => {
                dispatch(fetchSkill(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const addNewSkill = (formData) => {
    return (dispatch) => {
        let url = appConstants.ADD_AN_ITEM_URL + '?type=skills';
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
                        dispatch(insertionError('Skill already exists..!!!'));
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