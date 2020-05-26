import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Badge, Col, Row, /*, Modal*/ } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ModalPopup from '../common/ModalPopup';
import CustomDataTable from '../common/CustomDataTable';
import SkillPage from './skillFormPage';
import { fetchAllSkills } from '../../actions/skills';
import { getModalStatus, showModal, hideModal } from '../../actions/modal';

class ViewAllSkills extends React.Component {
    componentDidMount() {
        this.props.fetchAllSkills();
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
        const { skills, modal } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>Skills</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            <Button className="position-absolute" size="sm" variant="primary" onClick={() => this.handleShowModal('addSkill', true)}>Add New</Button>
                            <CustomDataTable data={skills} itemType="skills" />
                        </Col>
                    </Row>
                </div>
                <ModalPopup
                    size={'lg'}
                    show={modal.addSkill}
                    title={'Add New'}
                    body={<SkillPage />}
                    handleHideModal={this.handleHideModal}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.skills,
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllSkills: fetchAllSkills,
        getModalStatus: getModalStatus,
        showModal: showModal,
        hideModal: hideModal
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllSkills);