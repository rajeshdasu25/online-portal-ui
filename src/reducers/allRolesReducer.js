import { FETCH_ALL_ROLES } from '../actions/types';

export default function formsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_ROLES:
            return action.roles;
        default:
            return state;
    }
}