import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Col, Row, /*, Modal*/ } from 'react-bootstrap';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import CertificateFormPage from './certificateFormPage';
import { fetchAllCertificates } from '../../actions/certificates';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllCertificates extends React.Component {
    componentDidMount() {
        this.props.fetchAllCertificates();
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
        const { certificates, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Certificates</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <Button className="position-absolute" size="sm" variant="primary" onClick={() => this.handleShowModal('addCertificate', true)}>Add New</Button>
                            <CustomDataTable data={certificates} itemType="certificates" />
                        </Col>
                    </Row>
                </div>
                <ModalPopup
                    size={'lg'}
                    show={modal.addRole}
                    title={'Add New'}
                    body={<CertificateFormPage />}
                    handleHideModal={this.handleHideModal}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllCertificates: fetchAllCertificates,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllCertificates);