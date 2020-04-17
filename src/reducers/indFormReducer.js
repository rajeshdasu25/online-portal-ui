import { FETCH_IND_FORM } from '../actions/types';

export default function formReducer(state = [], action) {
    switch (action.type) {
        case FETCH_IND_FORM:
            return action.form;
        default:
            return state;
    }
}