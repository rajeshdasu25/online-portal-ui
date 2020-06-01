import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Col, Row, /*, Modal*/ } from 'react-bootstrap';

import CustomDataTable from '../common/CustomDataTable';
import { fetchAllForms } from '../../actions/forms';
import { fetchAllResponses } from '../../actions/responses';

class ViewAllResponses extends React.Component {
    componentDidMount() {
        const loginUser = {
            'type': localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType')),
            'id': localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId')),
            'sso': localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'))
        };
        this.props.fetchAllForms();
        (loginUser.type === '1') ? this.props.fetchAllResponses() : this.props.fetchAllResponses(loginUser);
    }
    handleShowModal = (type, status) => {
        this.props.showModal(type, status);
    }
    handleHideModal = () => {
        this.props.hideModal(false);
    }
    handleViewItem = () => {
        this.props.showModal(true);
    }
    handleEditItem = () => {
        this.props.showModal(true);
    }
    render() { 
        const { responses, forms } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Responses</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <CustomDataTable data={responses} forms={forms} itemType="responses" />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        forms: state.forms,
        responses: state.responses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllForms: () => dispatch(fetchAllForms()),
        fetchAllResponses: (params) => dispatch(fetchAllResponses(params))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllResponses);