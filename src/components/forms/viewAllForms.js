import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Badge, Col, Row, /*, Modal*/ } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import FormPage from './newFormPage';
import { fetchAllForms } from '../../actions/forms';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllForms extends React.Component {
    componentDidMount() {
        const loginUserType = localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType'));
        const loginUserId = localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId'));
        const loginUserSso = localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'));
        const loginUser = {
            'type': loginUserType,
            'id': loginUserId,
            'sso': loginUserSso
        };
        this.props.fetchAllForms(loginUser);
        this.props.getModalStatus();
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
        const { forms, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Forms</title>
                </Helmet>
                <div className="list-container">
                <Row>
                    <Col md={12} xs={12} sm={12}>
                        <CustomDataTable data={forms} itemType="forms" />
                    </Col>
                </Row></div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        forms: state.forms,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    /*return bindActionCreators({
        fetchAllForms: fetchAllForms,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);*/
    return {
        fetchAllForms: (params) => dispatch(fetchAllForms(params)),
        getModalStatus: () => dispatch(getModalStatus()),
        showModal: () => dispatch(showModal()),
        hideModal: () => dispatch(hideModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllForms);