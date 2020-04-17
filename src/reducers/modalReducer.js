import { GET_MODAL_STATUS, SET_MODAL_STATUS } from '../actions/types';

export default function modalReducer(state = [], action) { 
    switch (action.type) {
        case GET_MODAL_STATUS:
            return action.modal;
        case SET_MODAL_STATUS:
            return action.modal;
        default:
            return state;
    }
}