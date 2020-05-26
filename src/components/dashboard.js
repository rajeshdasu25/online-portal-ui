import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Card, Col, Row, Table } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import WidgetInfo from './common/WidgetInfo.js';

import { fetchAllCertificates } from '../actions/certificates';
import { fetchAllForms } from '../actions/forms';
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
        const {
            certificates, forms, responses, roles, /*skills,*/ trainings, users
        } = this.props;

        const masterItems = [
            { url: 'forms', text: 'Forms', theme: 'green' },
            { url: 'responses', text: 'Responses', theme: 'orange' },
            { url: 'certifications', text: 'Certifications', theme: 'purple' },
            { url: 'trainings', text: 'Trainings', theme: 'blue' },
            { url: 'trainings', text: 'Users', theme: 'yellow' },
            { url: 'roles', text: 'Roles', theme: 'brown' },
            { url: 'skills', text: 'Skills', theme: 'brown' },
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
                                    <WidgetInfo theme={item.theme} text={item.text} count={item.url.length} />
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        forms: state.forms,
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