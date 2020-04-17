import { FETCH_IND_RESPONSE } from '../actions/types';

export default function responseReducer(state = [], action) {
    switch (action.type) {
        case FETCH_IND_RESPONSE:
            return action.response;
        default:
            return state;
    }
}