import { FETCH_ALL_PROFICIENCIES } from '../actions/types';

export default function proficienciesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_PROFICIENCIES:
            return action.proficiencies;
        default:
            return state;
    }
}