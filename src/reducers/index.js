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
import training from './indTrainingReducer';
import trainings from './allTrainingsReducer';
import user from './indUserReducer';
import users from './allUsersReducer';
import loginUser from './loginUserReducer';
import loginUserId from './loginUserIdReducer';

const rootReducer = combineReducers({
    certificate: certificate,
    certificates: certificates,
    indForm: indForm,
    forms: forms,
    filterResponse: filterResponse,
    response: response,
    responses: responses,
    training: training,
    trainings: trainings,
    users: users,
    user: user,
    modal: modal,
    loginUser: loginUser,
    loginUserId: loginUserId,
    form: formReducer
});

export default rootReducer;