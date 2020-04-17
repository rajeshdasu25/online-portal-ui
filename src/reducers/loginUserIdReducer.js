import { CHECK_USER_LOGIN } from '../actions/types';

export default function loginUserIdReducer(state = [], action) {
    switch (action.type) {
        case CHECK_USER_LOGIN:
            return action.loginUserId;
        default:
            return state;
    }
}