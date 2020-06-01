import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';

let SubmitForm = props => {
    const { handleSubmit, reset, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="Name" className="col-form-label">Name</label>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Name" component="input" type="text" placeholder="Name" className="form-control" />
                    </Col>
                </Row>
            </div>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="Description" className="col-form-label">Description</label>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Description" component="input" type="text" placeholder="Description" className="form-control" />
                    </Col>
                </Row>
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
    )
}

SubmitForm = reduxForm({
    form: 'submitForm'
})(SubmitForm)

const selector = formValueSelector('SubmitForm');
SubmitForm = connect(state => {
    const Name = selector(state, 'Name');
    const Description = selector(state, 'Description');
    return {
        Name,
        Description
    }
})(SubmitForm)

export default SubmitForm;