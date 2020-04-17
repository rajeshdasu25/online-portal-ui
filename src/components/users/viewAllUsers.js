import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Badge, Col, Row, /*, Modal*/ } from 'react-bootstrap';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import UserFormPage from './userFormPage';
import { fetchAllUsers } from '../../actions/users';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllUsers extends React.Component {
    componentDidMount() {
        const loginUserType = localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType'));
        const loginUserId = localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId'));
        const loginUserSso = localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'));
        const loginUser = {
            'type': loginUserType,
            'id': loginUserId,
            'sso': loginUserSso
        };
        this.props.fetchAllUsers(loginUser);
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
        const { users, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Users</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <CustomDataTable data={users} itemType="users" />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: (params) => dispatch(fetchAllUsers(params)),
        getModalStatus: () => dispatch(getModalStatus()),
        showModal: () => dispatch(showModal()),
        hideModal: () => dispatch(hideModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllUsers);