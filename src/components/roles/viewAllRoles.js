import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Badge, Col, Row, /*, Modal*/ } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import RoleFormPage from './roleFormPage';
import { fetchAllRoles } from '../../actions/roles';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllRoles extends React.Component {
    componentDidMount() {
        this.props.fetchAllRoles();
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
        const { roles, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Roles</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <Button className="position-absolute" size="sm" variant="primary" onClick={() => this.handleShowModal('addRole', true)}>Add New</Button>
                            <CustomDataTable data={roles} itemType="roles" />
                        </Col>
                    </Row>
                </div>
                <ModalPopup
                    size={'lg'}
                    show={modal.addRole}
                    title={'Add New'}
                    body={<RoleFormPage />}
                    handleHideModal={this.handleHideModal}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        roles: state.roles,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllRoles: fetchAllRoles,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllRoles);