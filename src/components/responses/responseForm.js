import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
// import AddNewItem from './addNewItem';
// import AutoSuggestion from '../common/AutoSuggestion';
import AutoComplete from '../common/AutoComplete';
// import AutoSearch from '../common/AutoSearch';

const renderCertifications = ({ fields, certificates }) => (
    <div className="form-group">
        <Row>
            <Col md={12} sm={12} xs={12}>
                <Button type="button" variant="primary" onClick={() => fields.push({})}>Add Certification</Button>
            </Col>
        </Row>
        <Row>
        {fields.map((member, index) =>
            <Col md={4} sm={4} xs={12} key={index}>
                <Card bg="light" className="certification-ctr">
                    <Card.Header>
                        <Row>
                            <Col md={10} sm={10} xs={12}>
                                <span style={{'fontWeight': 'bold', 'color': '#fff'}}>Certification #{index + 1}</span>
                            </Col>
                            <Col md={2} sm={2} xs={12} className="text-right">
                                <Button type="button" variant="danger" size="sm" onClick={() => fields.remove(index)}>X</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group">
                            <Row>
                                <Col md={4} sm={4} xs={12}>
                                    <label htmlFor="CertificationName" className="col-form-label">Name</label>
                                </Col>
                                <Col md={8} sm={8} xs={12}>
                                    {/* <Field name={`${member}.CertificationName`} component="input" type="text" placeholder="Name" className="form-control" /> */}
                                    {/* <Autosuggest suggestions={suggestions} />
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps} /> */}
                                    {/* <AutoSuggestion data={certificates} /> */}
                                    <AutoComplete FieldName={`${member}.CertificationName`} data={certificates} />
                                    {/* <AutoSearch data={certificates} /> */}
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col md={4} sm={4} xs={12}>
                                    <label htmlFor="CertificationAuthority" className="col-form-label">Authority</label>
                                </Col>
                                <Col md={8} sm={8} xs={12}>
                                    <Field name={`${member}.CertificationAuthority`} component="input" type="text" placeholder="" className="form-control" />
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )}
        </Row>
    </div>
);

const renderTrainings = ({ fields }) => (
    <div className="form-group">
        <Row>
            <Col md={12} sm={12} xs={12}>
                <Button type="button" variant="primary" onClick={() => fields.push({})}>Add Trainings</Button>
            </Col>
        </Row>
        <Row>
        {fields.map((member, index) =>
            <Col md={4} sm={4} xs={12} key={index}>
                <Card bg="light" className="training-ctr">
                    <Card.Header>
                        <Row>
                            <Col md={10} sm={10} xs={12}>
                                <span style={{'fontWeight': 'bold', 'color': '#fff'}}>Training #{index + 1}</span>
                            </Col>
                            <Col md={2} sm={2} xs={12} className="text-right">
                                <Button type="button" variant="danger" size="sm" onClick={() => fields.remove(index)}>X</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div className="form-group">
                            <Row>
                                <Col md={4} sm={4} xs={12}>
                                    <label htmlFor="TrainingName" className="col-form-label">Name</label>
                                </Col>
                                <Col md={8} sm={8} xs={12}>
                                    {/* <Field name={`${member}.TrainingName`} component="input" type="text" placeholder="Name" className="form-control" /> */}
                                    <AutoComplete FieldName={`${member}.TrainingName`} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col md={4} sm={4} xs={12}>
                                    <label htmlFor="TrainingStream" className="col-form-label">Stream</label>
                                </Col>
                                <Col md={8} sm={8} xs={12}>
                                    <Field name={`${member}.TrainingStream`} component="input" type="text" placeholder="" className="form-control" /> 
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )}
        </Row>
    </div>
);

let ResponseForm = props => {
    const { handleSubmit, reset, certificates, pristine, submitting } = props;
    return (
        <Row>
            <Col md={12} sm={12} xs={12}>
                <Card>
                    <Card.Header><h5>Submit New Response</h5></Card.Header>
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={12} className="text-right">
                                        <label htmlFor="SSO" className="col-form-label">SSO ID</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="SSO" component="input" type="text" placeholder="SSO ID" className="form-control" />
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="text-right">
                                        <label htmlFor="KIN" className="col-form-label">KIN ID</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="KIN" component="input" type="text" placeholder="KIN ID" className="form-control" />
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={12} className="text-right">
                                        <label htmlFor="CgEmail" className="col-form-label">CG Email</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="CgEmail" component="input" type="text" placeholder="CG Email" className="form-control" />
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="text-right">
                                        <label htmlFor="SyfEmail" className="col-form-label">SYF Email</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="SyfEmail" component="input" type="text" placeholder="SYF Email" className="form-control" />
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={12} className="text-right">
                                        <label htmlFor="FirstName" className="col-form-label">Full Name</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="FirstName" component="input" type="text" placeholder="Full Name" className="form-control" />
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="text-right">
                                        <label htmlFor="Designation" className="col-form-label">Designation</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="Designation" component="input" type="text" placeholder="Designation" className="form-control" />
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={12} className="text-right">
                                        <label htmlFor="Band" className="col-form-label">Band</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="Band" component="input" type="text" placeholder="Band" className="form-control" />
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="text-right">
                                        <label htmlFor="Grade" className="col-form-label">Grade</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="Grade" component="input" type="text" placeholder="Grade" className="form-control" />
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={12} className="text-right">
                                        <label htmlFor="SyfTower" className="col-form-label">SYF Tower</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="SyfTower" component="input" type="text" placeholder="SYF Tower" className="form-control" />
                                    </Col>
                                    <Col md={2} sm={2} xs={12} className="text-right">
                                        <label htmlFor="SyfApplication" className="col-form-label">SYF Application</label>
                                    </Col>
                                    <Col md={3} sm={3} xs={12}>
                                        <Field name="SyfApplication" component="input" type="text" placeholder="SYF Application" className="form-control" />
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">Certifications</Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <FieldArray name="certifications" props={{ certificates: certificates }} component={renderCertifications} />
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">Trainings</Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <FieldArray name="trainings" component={renderTrainings} />
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col md={11} sm={11} xs={11} className="text-right">
                                        <Button type="submit" variant="primary" className="formBtns" disabled={pristine || submitting}>Submit</Button>
                                        <Button type="button" variant="secondary" className="formBtns" disabled={pristine || submitting} onClick={reset}>Clear</Button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

ResponseForm = reduxForm({
    form: 'responseForm'
})(ResponseForm)

const selector = formValueSelector('responseForm');
ResponseForm = connect(
    state => {
        const SSO = selector(state, 'SSO');
        return {
            SSO,
        }
    }
)(ResponseForm);

// ResponseForm = connect(
//     state => ({
//         initialValues: state.loginUser,
//     }), null
// )(ResponseForm);

export default ResponseForm;