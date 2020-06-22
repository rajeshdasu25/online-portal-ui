import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import ProficiencyFormPage from './proficiencyFormPage';
import { fetchAllProficiencies } from '../../actions/proficiencies';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllProficiencies extends React.Component {
    componentDidMount() {
        this.props.fetchAllProficiencies();
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
        const { proficiencies, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Proficiencies</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <Button className="position-absolute" size="sm" variant="primary" onClick={() => this.handleShowModal('addProficiency', true)}>Add New</Button>
                            <CustomDataTable data={proficiencies} itemType="proficiencies" />
                        </Col>
                    </Row>
                </div>
                <ModalPopup
                    size={'lg'}
                    show={modal.addProficiency}
                    title={'Add New'}
                    body={<ProficiencyFormPage />}
                    handleHideModal={this.handleHideModal}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        proficiencies: state.proficiencies,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllProficiencies: fetchAllProficiencies,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllProficiencies);