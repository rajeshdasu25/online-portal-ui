import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Badge, Card, Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { fetchATraining } from '../../actions/trainings';

class ViewIndTraining extends React.Component {
    componentDidMount() {
        const certId = this.props.match.params.id;
        this.props.fetchATraining(certId);
    }
    render() {
        const { training } = this.props;
        return (
            <React.Fragment>
                <Helmet>
                    <title>Training</title>
                </Helmet>
                <Card>
                    <Card.Body>
                        <Link to={`/accounts`}>&laquo; Back to Accounts</Link>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header><h5>View Training - {training.Name}</h5></Card.Header>
                    <Card.Body>
                        {training && (training.length === 0) && <div className="loader-container">
                            <Loader type="Watch" color="#00BFFF" />
                        </div>}
                        <div className="form-group">
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="type" className="col-form-label">Name&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <label className="col-form-label">{training.Name}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="type" className="col-form-label">Number&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <label className="col-form-label">{training.Number}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="balance" className="col-form-label">Balance&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <label className="col-form-label">Rs. {training.Balance} /-</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="type" className="col-form-label">Status&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <Badge variant={training.ActiveStatus === '1' ? 'success' : 'danger'}>
                                        {training.ActiveStatus === '1' ? 'Active' : 'Inactive'}
                                    </Badge>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        training: state.training
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchATraining: fetchATraining
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewIndTraining);