import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

import SkillForm from './skillForm';

class ViewReports extends React.Component {
    componentDidMount() {
        const loginUser = {
            'type': localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType')),
            'id': localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId')),
            'sso': localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'))
        };
    }

    render() {
        // const { certificates, forms, filterResponse, responses, trainings, users } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Reports</title>
                </Helmet>
                <SkillForm onSubmit={this.submit} {...this.props} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewReports);