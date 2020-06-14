import { INSERTION_ERROR } from '../actions/types';

export default function insertionErrorReducer(state = [], action) {
    switch (action.type) {
        case INSERTION_ERROR:
            return {
                ...state,
                error: true,
                message: action.insertionErrorMessage
            };
        default:
            return state;
    }
}