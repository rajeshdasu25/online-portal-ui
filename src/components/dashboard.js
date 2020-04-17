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

class Dashboard extends React.Component {

    fetchAllItems = (loginUser) => {
        return Promise.all([
            this.props.fetchAllCertificates(),
            this.props.fetchAllForms(loginUser),
            this.props.fetchAllResponses(loginUser)
        ]);
    }

    componentDidMount() {
        const loginUserType = localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType'));
        const loginUserId = localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId'));
        const loginUserSso = localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'));
        const loginUser = {
            'type': loginUserType,
            'id': loginUserId,
            'sso': loginUserSso
        };
        this.fetchAllItems(loginUser);
    }

    render() {
        const {
            certificates, forms, responses
        } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <Row>
                    <Col md={2} xs={4} sm={6}>
                        <Link to="/forms">
                            <WidgetInfo theme='green' text='Forms' count={forms && forms.length} />
                        </Link>
                    </Col>
                    <Col md={2} xs={4} sm={6}>
                        <Link to="/responses">
                            <WidgetInfo theme='orange' text='Responses' count={responses.length} />
                        </Link>
                    </Col>
                    <Col md={2} xs={4} sm={6}>
                        <Link to="/certifications">
                            <WidgetInfo theme='purple' text='Certifications' count={certificates.length} />
                        </Link>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        forms: state.forms,
        responses: state.responses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCertificates: () => dispatch(fetchAllCertificates()),
        fetchAllForms: (params) => dispatch(fetchAllForms(params)),
        fetchAllResponses: (params) => dispatch(fetchAllResponses(params))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);