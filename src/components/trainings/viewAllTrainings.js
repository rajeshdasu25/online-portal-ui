import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Col, Row, /*, Modal*/ } from 'react-bootstrap';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import TrainingFormPage from './trainingFormPage';
import { fetchAllTrainings } from '../../actions/trainings';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllTrainings extends React.Component {
    componentDidMount() {
        this.props.fetchAllTrainings();
        this.props.getModalStatus();
    }
    handleShowModal = (type, status) => { console.log('type: ',type, '; status: ', status);
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
        const { trainings, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Trainings</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <Button className="position-absolute" size="sm" variant="primary" onClick={() => this.handleShowModal('addTraining', true)}>Add New</Button>
                            <CustomDataTable data={trainings} itemType="trainings" />
                        </Col>
                    </Row>
                </div>
                <ModalPopup
                    size={'lg'}
                    show={modal.addTraining}
                    title={'Add New'}
                    body={<TrainingFormPage />}
                    handleHideModal={this.handleHideModal}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        trainings: state.trainings,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllTrainings: fetchAllTrainings,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllTrainings);