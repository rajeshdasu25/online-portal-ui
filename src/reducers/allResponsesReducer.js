import { FETCH_ALL_RESPONSES } from '../actions/types';

export default function responsesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_RESPONSES:
            return action.responses;
        default:
            return state;
    }
}