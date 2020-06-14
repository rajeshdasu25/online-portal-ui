import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modal from './modalReducer';
import certificate from './indCertificateReducer';
import certificates from './allCertificatesReducer';
import indForm from './indFormReducer';
import forms from './allFormsReducer';
import response from './indResponseReducer';
import filterResponse from './filterResponsesReducer';
import responses from './allResponsesReducer';
import role from './indRoleReducer';
import roles from './allRolesReducer';
import skill from './indSkillReducer';
import skills from './allSkillsReducer';
import training from './indTrainingReducer';
import trainings from './allTrainingsReducer';
import user from './indUserReducer';
import users from './allUsersReducer';
import loginUser from './loginUserReducer';
import loginUserId from './loginUserIdReducer';
import loginError from './loginErrorReducer';
import insertionError from './insertionErrorReducer';

const rootReducer = combineReducers({
    certificate: certificate,
    certificates: certificates,
    indForm: indForm,
    forms: forms,
    filterResponse: filterResponse,
    response: response,
    responses: responses,
    role: role,
    roles: roles,
    skill: skill,
    skills: skills,
    training: training,
    trainings: trainings,
    users: users,
    user: user,
    modal: modal,
    loginUser: loginUser,
    loginUserId: loginUserId,
    loginError: loginError,
    insertionError: insertionError,
    form: formReducer
});

export default rootReducer;