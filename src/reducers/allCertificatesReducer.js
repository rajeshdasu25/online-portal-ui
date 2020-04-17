import { FETCH_ALL_CERTIFICATES } from '../actions/types';

export default function certificatesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_CERTIFICATES:
            return action.certificates;
        default:
            return state;
    }
}