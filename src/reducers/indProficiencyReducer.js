import { FETCH_IND_PROFICIENCY } from '../actions/types';

export default function proficiencyReducer(state = [], action) {
    switch (action.type) {
        case FETCH_IND_PROFICIENCY:
            return action.proficiency;
        default:
            return state;
    }
}