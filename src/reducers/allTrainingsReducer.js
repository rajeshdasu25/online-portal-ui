import { FETCH_ALL_TRAININGS } from '../actions/types';

export default function trainingsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_TRAININGS:
            return action.trainings;
        default:
            return state;
    }
}