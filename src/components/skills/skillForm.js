import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import * as helpers from '../../helpers/form';

let SkillForm = props => {
    const { handleSubmit, reset, roles, pristine, submitting, insertionError } = props;
    return (
        <form onSubmit={handleSubmit}>
            {insertionError.error && <div className="alert alert-danger text-center font-weight-bold" role="alert">
                {insertionError.message}
            </div>}
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="type" className="col-form-label">Role</label>
                        <span className="text-danger">&nbsp;*&nbsp;</span>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="RoleId" component={helpers.renderSelectField} className="form-control" validate={[helpers.required]} >
                            <option value=''>Select</option>
                            {roles.map((role) => {
                                return (
                                    <option
                                        key={role.Id}
                                        value={role.Id}>
                                        {role.DisplayName}
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
                        <span className="text-danger">&nbsp;*&nbsp;</span>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="Name" component={helpers.renderField} type="text" placeholder="Name" className="form-control" validate={[helpers.required]} />
                    </Col>
                </Row>
            </div>
            {/* <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="DisplayName" className="col-form-label">DisplayName</label>
                        <span className="text-danger">&nbsp;*&nbsp;</span>
                    </Col>
                    <Col md={8} sm={8} xs={8}>
                        <Field name="DisplayName" component={helpers.renderField} type="text" placeholder="Display Name" className="form-control" validate={[helpers.required]} />
                    </Col>
                </Row>
            </div> */}
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

SkillForm = reduxForm({
    form: 'skillForm'
})(SkillForm)

const selector = formValueSelector('skillForm');
SkillForm = connect(state => {
    const RoleId = selector(state, 'RoleId');
    const Name = selector(state, 'Name');
    // const DisplayName = selector(state, 'DisplayName');
    return {
        RoleId,
        Name,
        // DisplayName
    }
})(SkillForm)

export default SkillForm;