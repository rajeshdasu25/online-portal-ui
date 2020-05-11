import { FETCH_FILTER_RESPONSE } from '../actions/types';

export default function filterResponsesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_FILTER_RESPONSE:
            return action.filterResponse;
        default:
            return state;
    }
}