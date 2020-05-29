import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Card, Col, Row } from 'react-bootstrap';

let LoginForm = props => {
    const { handleSubmit, reset, pristine, submitting, loginError } = props;
    return (
        <Row className="login-ctr">
            <Col md={12} sm={12} xs={12} className="login-ctr-item">
                <Card bg="light">
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            {loginError.error && <p className="text-center text-danger font-weight-bold">{loginError.message}</p>}
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={3} className="text-right">
                                        <label htmlFor="SsoId" className="col-form-label">SSO ID</label>
                                    </Col>
                                    <Col md={8} sm={8} xs={8}>
                                        <Field name="SsoId" component="input" type="text" placeholder="SSO ID" className="form-control" />
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={3} className="text-right">
                                        <label htmlFor="Password" className="col-form-label">Password</label>
                                    </Col>
                                    <Col md={8} sm={8} xs={8}>
                                        <Field name="Password" component="input" type="password" placeholder="Password" className="form-control" />
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
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

LoginForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const selector = formValueSelector('loginForm');
LoginForm = connect(state => {
    const SsoId = selector(state, 'SsoId');
    const Password = selector(state, 'Password');
    return {
        SsoId,
        Password
    }
})(LoginForm)

export default LoginForm;