import { FETCH_ALL_SKILLS } from '../actions/types';

export default function skillsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_SKILLS:
            return action.skills;
        default:
            return state;
    }
}