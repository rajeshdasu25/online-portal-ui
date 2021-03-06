import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import CustomDataTable from '../common/CustomDataTable';
import { fetchAllCertificates } from '../../actions/certificates';
import { fetchAllForms } from '../../actions/forms';
import { fetchAllResponses, fetchFilterResponses } from '../../actions/responses';
import { fetchAllTrainings } from '../../actions/trainings';
import { fetchAllUsers } from '../../actions/users';
import FilterForm from './filterForm';

class ViewReports extends React.Component {
    componentDidMount() {
        // const loginUser = {
        //     'type': localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType')),
        //     'id': localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId')),
        //     'sso': localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'))
        // };
        const loginUser = {
            'type': sessionStorage.hasOwnProperty('loginUserType') && JSON.parse(sessionStorage.getItem('loginUserType')),
            'id': sessionStorage.hasOwnProperty('loginUserId') && JSON.parse(sessionStorage.getItem('loginUserId')),
            'sso': sessionStorage.hasOwnProperty('loginSsoId') && JSON.parse(sessionStorage.getItem('loginSsoId'))
        };
        this.props.fetchAllCertificates();
        this.props.fetchAllForms();
        this.props.fetchAllTrainings();
        this.props.fetchAllUsers();
        (loginUser.type === '1') ? this.props.fetchAllResponses() : this.props.fetchAllResponses(loginUser);
    }

    submit = formValues => {
        this.props.fetchFilterResponses(formValues);
    }

    render() {
        const { forms, filterResponse, responses, /*certificates, trainings, users*/ } = this.props;

        filterResponse.forEach(function (response) {
            response.expand = [];
            let expandObj = {
                "First Name": response.FirstName,
                "Last Name": response.LastName,
                "Email": response.EmailAddr,
                "Phone": response.Phoneno,
            };
            response.expand.push(expandObj);
        });

        responses.forEach(function (response) {
            response.expand = [];
            let expandObj = {
                "certifications": response.certifications,
                "skills": response.skills,
                "trainings": response.trainings
            };
            response.expand.push(expandObj);
        });

        return (
            <React.Fragment>
                <Helmet>
                    <title>Reports</title>
                </Helmet>
                {/* <FilterForm onSubmit={this.submit} {...this.props} /> */}
                {/* {filterResponse && (filterResponse.length > 0) && <div className="list-container"> */}
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <CustomDataTable data={responses} forms={forms} itemType="reports" />
                        </Col>
                    </Row>
                </div>
                {/* </div>} */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        forms: state.forms,
        responses: state.responses,
        trainings: state.trainings,
        users: state.users,
        filterResponse: state.filterResponse
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCertificates: () => dispatch(fetchAllCertificates()),
        fetchAllForms: () => dispatch(fetchAllForms()),
        fetchAllResponses: (params) => dispatch(fetchAllResponses(params)),
        fetchAllTrainings: () => dispatch(fetchAllTrainings()),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchFilterResponses: (params) => dispatch(fetchFilterResponses(params)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewReports);