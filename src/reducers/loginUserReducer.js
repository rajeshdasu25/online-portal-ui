import { FETCH_LOGIN_USER } from '../actions/types';

export default function loginUserReducer(state = [], action) {
    switch (action.type) {
        case FETCH_LOGIN_USER:
            return action.loginUser;
        default:
            return state;
    }
}