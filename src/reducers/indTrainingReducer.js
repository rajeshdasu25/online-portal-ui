import { FETCH_IND_CERTIFICATE } from '../actions/types';

export default function certificateReducer(state = [], action) {
    switch (action.type) {
        case FETCH_IND_CERTIFICATE:
            return action.certificate;
        default:
            return state;
    }
}