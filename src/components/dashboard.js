import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

import WidgetInfo from './common/WidgetInfo.js';

import { fetchAllCertificates } from '../actions/certificates';
import { fetchAllForms } from '../actions/forms';
import { fetchAllProficiencies } from '../actions/proficiencies';
import { fetchAllResponses } from '../actions/responses';
import { fetchAllRoles } from '../actions/roles';
import { fetchAllSkills } from '../actions/skills';
import { fetchAllTrainings } from '../actions/trainings';
import { fetchAllUsers } from '../actions/users';

class Dashboard extends React.Component {

    fetchAllItems = (loginUser) => {
        return Promise.all([
            this.props.fetchAllCertificates(),
            this.props.fetchAllForms(loginUser),
            this.props.fetchAllProficiencies(),
            this.props.fetchAllResponses(loginUser),
            this.props.fetchAllRoles(),
            this.props.fetchAllSkills(),
            this.props.fetchAllTrainings(),
            this.props.fetchAllUsers()
        ]);
    }

    componentDidMount() {
        //this.fetchAllItems(loginUser);
        const loginUser = {
            'type': localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType')),
            'id': localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId')),
            'sso': localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'))
        };
        this.props.fetchAllCertificates();
        this.props.fetchAllProficiencies();
        this.props.fetchAllRoles();
        this.props.fetchAllSkills();
        this.props.fetchAllTrainings();
        this.props.fetchAllUsers();
        if (loginUser.type === '1') {
            this.props.fetchAllForms();
            this.props.fetchAllResponses();
        } else {
            this.props.fetchAllForms(loginUser);
            this.props.fetchAllResponses(loginUser);
        }
    }

    render() {
        // const loginUserType = localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType'));
        // let redirectPage = loginUserType === '1' ? '/dashboard' : '/new-response';

        const {
            certificates, forms, responses, roles, skills, trainings, users, proficiencies
        } = this.props;

        const masterItems = [
            { url: 'forms', text: 'Forms', theme: 'green', count: forms },
            { url: 'responses', text: 'Responses', theme: 'orange', count: responses },
            { url: 'certifications', text: 'Certifications', theme: 'purple', count: certificates },
            { url: 'trainings', text: 'Trainings', theme: 'blue', count: trainings },
            { url: 'users', text: 'Users', theme: 'yellow', count: users },
            { url: 'roles', text: 'Roles', theme: 'brown', count: roles },
            { url: 'skills', text: 'Skills', theme: 'brown', count: skills },
            { url: 'proficiencies', text: 'Proficiencies', theme: 'brown', count: proficiencies },
        ];

        return (
            <React.Fragment>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <Row>
                    {masterItems.map((item, index) => {
                        return (
                            <Col md={2} xs={4} sm={6} key={index}>
                                <Link to={'/' + item.url}>
                                    <WidgetInfo theme={item.theme} text={item.text} count={item.count.length} />
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
                {/* <Redirect to={redirectPage} push={true} />; */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        forms: state.forms,
        proficiencies: state.proficiencies,
        responses: state.responses,
        roles: state.roles,
        skills: state.skills,
        trainings: state.trainings,
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCertificates: () => dispatch(fetchAllCertificates()),
        fetchAllForms: (params) => dispatch(fetchAllForms(params)),
        fetchAllProficiencies: () => dispatch(fetchAllProficiencies()),
        fetchAllResponses: (params) => dispatch(fetchAllResponses(params)),
        fetchAllRoles: () => dispatch(fetchAllRoles()),
        fetchAllSkills: () => dispatch(fetchAllSkills()),
        fetchAllTrainings: () => dispatch(fetchAllTrainings()),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);