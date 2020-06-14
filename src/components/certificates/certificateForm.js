import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import * as helpers from '../../helpers/form';

let CertificateForm = props => {
    const { handleSubmit, reset, pristine, submitting, insertionError } = props;
    return (
        <form onSubmit={handleSubmit}>
            {insertionError.error && <div className="alert alert-danger text-center font-weight-bold" role="alert">
                {insertionError.message}
            </div>}
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="Name" className="col-form-label">Name</label>
                        <span className="text-danger">&nbsp;*&nbsp;</span>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Name" component={helpers.renderField} type="text" placeholder="Name" className="form-control" validate={[helpers.required]} />
                    </Col>
                </Row>
            </div>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="Authority" className="col-form-label">Authority</label>
                        <span className="text-danger">&nbsp;*&nbsp;</span>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Authority" component={helpers.renderField} type="text" placeholder="Authority" className="form-control" validate={[helpers.required]} />
                    </Col>
                </Row>
            </div>
            <div className="form-group">
                <Row>
                    <Col md={11} sm={11} xs={11} className="text-right">
                        <Button type="submit" variant="primary" className="formBtns" disabled={submitting} /*disabled={pristine || submitting}*/>Submit</Button>
                        <Button type="button" variant="secondary" className="formBtns" disabled={pristine || submitting} onClick={reset}>Clear</Button>
                    </Col>
                </Row>
            </div>
        </form>
    )
}

CertificateForm = reduxForm({
    form: 'certificateForm'
})(CertificateForm)

const selector = formValueSelector('certificateForm');
CertificateForm = connect(state => {
    const Name = selector(state, 'Name');
    const Authority = selector(state, 'Authority');
    return {
        Name,
        Authority
    }
})(CertificateForm)

export default CertificateForm;