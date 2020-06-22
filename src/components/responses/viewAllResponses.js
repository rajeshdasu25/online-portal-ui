import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Col, Row, /*, Modal*/ } from 'react-bootstrap';

import CustomDataTable from '../common/CustomDataTable';
import { fetchAllForms } from '../../actions/forms';
import { fetchAllProficiencies } from '../../actions/proficiencies';
import { fetchAllResponses } from '../../actions/responses';
import { getKeyByValue } from '../../helpers/form';

class ViewAllResponses extends React.Component {
    componentDidMount() {
        const loginUser = {
            'type': localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType')),
            'id': localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId')),
            'sso': localStorage.hasOwnProperty('loginSsoId') && JSON.parse(localStorage.getItem('loginSsoId'))
        };
        this.props.fetchAllForms();
        this.props.fetchAllProficiencies();
        (loginUser.type === '1') ? this.props.fetchAllResponses() : this.props.fetchAllResponses(loginUser.sso);
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
    getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }
    render() {
        const { proficiencies, responses, forms, location } = this.props;
        const insertStatus = location.state && location.state.insertStatus;

        responses.forEach(function (response) {
            response.expand = [];
            response.skills.forEach(function (skill) {//console.log('skill: ', skill);
                let skillVal = Object.values(skill)[0];//console.log('skillVal: ', skillVal);
                let profVal = getKeyByValue(proficiencies, skillVal);//console.log('profVal: ', profVal);
            });
            let expandObj = {
                "certifications": response.certifications,
                "skills": response.skills,
                "trainings": response.trainings
            };
            response.expand.push(expandObj);
        });

        return (
            <React.Fragment>
                <Helmet>
                    <title>Responses</title>
                </Helmet>
                <div className="list-container">
                    <Row>
                        <Col md={12} xs={12} sm={12}>
                            {insertStatus && insertStatus === 'success' && <div className="alert alert-success text-center font-weight-bold" role="alert">
                                Response added successfully..!!!
                            </div>}
                            {insertStatus && insertStatus === 'failure' && <div className="alert alert-danger text-center font-weight-bold" role="alert">
                                Something went wrong. Contact the administrator..!!!
                            </div>}
                        </Col>
                    </Row>
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
        proficiencies: state.proficiencies,
        responses: state.responses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllForms: () => dispatch(fetchAllForms()),
        fetchAllProficiencies: () => dispatch(fetchAllProficiencies()),
        fetchAllResponses: (params) => dispatch(fetchAllResponses(params))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAllResponses);