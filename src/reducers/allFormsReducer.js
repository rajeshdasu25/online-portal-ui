import { FETCH_ALL_FORMS } from '../actions/types';

export default function formsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_FORMS:
            return action.forms;
        default:
            return state;
    }
}