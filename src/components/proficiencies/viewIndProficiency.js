import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Badge, Card, Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { fetchAProficiency } from '../../actions/proficiencies';

class ViewIndProficiency extends React.Component {
    componentDidMount() {
        const certId = this.props.match.params.id;
        this.props.fetchAProficiency(certId);
    }
    render() {
        const { proficiency } = this.props;
        return (
            <React.Fragment>
                <Helmet>
                    <title>Proficiency</title>
                </Helmet>
                <Card>
                    <Card.Body>
                        <Link to={`/accounts`}>&laquo; Back to Accounts</Link>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header><h5>View Proficiency - {proficiency.Name}</h5></Card.Header>
                    <Card.Body>
                        {proficiency && (proficiency.length === 0) && <div className="loader-container">
                            <Loader type="Watch" color="#00BFFF" />
                        </div>}
                        <div className="form-group">
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="type" className="col-form-label">Name&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <label className="col-form-label">{proficiency.Name}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="type" className="col-form-label">Number&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <label className="col-form-label">{proficiency.Number}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="balance" className="col-form-label">Balance&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <label className="col-form-label">Rs. {proficiency.Balance} /-</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} sm={3} xs={3} className="text-right">
                                    <label htmlFor="type" className="col-form-label">Status&nbsp;:&nbsp;</label>
                                </Col>
                                <Col md={8} sm={8} xs={8}>
                                    <Badge variant={proficiency.ActiveStatus === '1' ? 'success' : 'danger'}>
                                        {proficiency.ActiveStatus === '1' ? 'Active' : 'Inactive'}
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
        proficiency: state.proficiency
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAProficiency: fetchAProficiency
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewIndProficiency);