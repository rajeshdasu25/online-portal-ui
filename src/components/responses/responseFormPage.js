import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchLoginUser } from '../../actions/auth';
import { fetchAllCertificates } from '../../actions/certificates';
import { fetchAllProficiencies } from '../../actions/proficiencies';
import { addNewResponse } from '../../actions/responses';
import { fetchAllSkills } from '../../actions/skills';
import ResponseForm from './responseForm';

class ResponseFormPage extends React.Component {
    submit = formValues => {
        let skillsObj = [];
        Object.keys(formValues).forEach(function (key) {
            if (key.startsWith('skill_')) {
                let skillKey = key.split('skill_')[1];
                skillsObj.push({ [skillKey]: formValues[key] });
            }
        });
        let userObj = {
            userSsoId: formValues.SsoId,
            userFullName: formValues.LastName + ', ' + formValues.FirstName,
            userCertifications: formValues.certifications ? formValues.certifications : [],
            userSkills: skillsObj,
            userTrainings: formValues.trainings ? formValues.trainings : [],
            dateTime: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
            expand: {
                userCertifications: formValues.certifications ? formValues.certifications : [],
                userSkills: skillsObj,
                userTrainings: formValues.trainings ? formValues.trainings : []
            }
        }; //console.log('userObj: ', userObj);
        this.props.addNewResponse(userObj);
    }

    componentDidMount() {
        const loginSsoId = localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'));
        const loginUserRoleId = localStorage.hasOwnProperty('loginUserRoleId') && JSON.parse(localStorage.getItem('loginUserRoleId'));
        this.props.fetchLoginUser(loginSsoId);
        this.props.fetchAllCertificates();
        this.props.fetchAllProficiencies();
        this.props.fetchAllSkills(loginUserRoleId);
    }

    render() {
        return <ResponseForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        loginUser: state.loginUser,
        loginUserId: state.loginUserId,
        proficiencies: state.proficiencies,
        skills: state.skills
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        addNewResponse: (params) => dispatch(addNewResponse(params, props)),
        fetchLoginUser: (params) => dispatch(fetchLoginUser(params)),
        fetchAllCertificates: () => dispatch(fetchAllCertificates()),
        fetchAllProficiencies: () => dispatch(fetchAllProficiencies()),
        fetchAllSkills: (params) => dispatch(fetchAllSkills(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormPage);