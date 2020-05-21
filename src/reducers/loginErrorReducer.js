import { AUTH_ERROR } from '../actions/types';

export default function loginErrorReducer(state = [], action) {
    switch (action.type) {
        case AUTH_ERROR:
            return {
                ...state,
                error: true,
                message: action.loginErrorMessage
            };
        default:
            return state;
    }
}