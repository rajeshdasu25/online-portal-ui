import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';

let AccountForm = props => {
    const { handleSubmit, reset, accountTypes, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="type" className="col-form-label">Type</label>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="AccountTypeId" component="select" className="form-control" >
                            <option value=''>Select</option>
                            {accountTypes.map((account) => {
                                return (
                                    <option
                                        key={account.Id}
                                        value={account.Id}>
                                        {account.Name}
                                    </option>
                                );
                            })}
                        </Field>
                    </Col>
                </Row>
            </div>
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
                        <label htmlFor="Number" className="col-form-label">Number</label>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Number" component="input" type="text" placeholder="Number" className="form-control" />
                    </Col>
                </Row>
            </div>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="Balance" className="col-form-label">Balance</label>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Balance" component="input" type="text" placeholder="Balance" className="form-control" />
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

AccountForm = reduxForm({
    form: 'accountForm'
})(AccountForm)

const selector = formValueSelector('accountForm');
AccountForm = connect(state => {
    const AccountTypeId = selector(state, 'AccountTypeId');
    const Name = selector(state, 'Name');
    const Number = selector(state, 'Number');
    const Balance = selector(state, 'Balance');
    return {
        AccountTypeId,
        Name,
        Number,
        Balance
    }
})(AccountForm)

export default AccountForm;