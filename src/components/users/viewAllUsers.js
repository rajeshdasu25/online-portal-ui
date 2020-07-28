import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Col, Row, /*, Modal*/ } from 'react-bootstrap';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import UserFormPage from './userFormPage';
import { fetchAllUsers } from '../../actions/users';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllUsers extends React.Component {
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
                            <Button className="position-absolute" size="sm" variant="primary" onClick={() => this.handleShowModal('addUser', true)}>Add New</Button>
                            <CustomDataTable data={users} itemType="users" />
                        </Col>
                    </Row>
                </div>
                <ModalPopup
                    size={'lg'}
                    show={modal.addUser}
                    title={'Add New'}
                    body={<UserFormPage />}
                    handleHideModal={this.handleHideModal}
                />
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
    // return {
    //     fetchAllUsers: (params) => dispatch(fetchAllUsers(params)),
    //     getModalStatus: () => dispatch(getModalStatus()),
    //     showModal: () => dispatch(showModal()),
    //     hideModal: () => dispatch(hideModal())
    // };
    return bindActionCreators({
        fetchAllUsers: fetchAllUsers,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllUsers);