import { FETCH_ALL_USERS } from '../actions/types';

export default function trainingsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.users;
        default:
            return state;
    }
}