import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';

let UserForm = props => {
    const { handleSubmit, reset, roles, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3} className="text-right">
                        <label htmlFor="UserTypeId" className="col-form-label">Type</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="UserTypeId" component="select" className="form-control" >
                            <option value=''>Select</option>
                            <option value='1'>Admin</option>
                            <option value='2'>Manager</option>
                            <option value='3'>Non Manager</option>
                        </Field>
                    </Col>
                    <Col md={2} sm={2} xs={12} className="text-right">
                        <label htmlFor="RoleId" className="col-form-label">Role</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="RoleId" component="select" className="form-control" >
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
                    <Col md={3} sm={3} xs={12} className="text-right">
                        <label htmlFor="SsoId" className="col-form-label">SSO ID</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="SsoId" component="input" type="text" placeholder="SSO ID" className="form-control" />
                    </Col>
                    <Col md={2} sm={2} xs={12} className="text-right">
                        <label htmlFor="KinId" className="col-form-label">KIN ID</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="KinId" component="input" type="text" placeholder="KIN ID" className="form-control" />
                    </Col>
                </Row>
            </div>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={12} className="text-right">
                        <label htmlFor="FirstName" className="col-form-label">First Name</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="FirstName" component="input" type="text" placeholder="First Name" className="form-control" />
                    </Col>
                    <Col md={2} sm={2} xs={12} className="text-right">
                        <label htmlFor="LastName" className="col-form-label">Last Name</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="LastName" component="input" type="text" placeholder="Last Name" className="form-control" />
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
                        <label htmlFor="DateOfBirth" className="col-form-label">Date Of Birth</label>
                    </Col>
                    <Col md={3} sm={3} xs={12}>
                        <Field name="DateOfBirth" component="input" type="text" placeholder="MM/DD/YYYY" className="form-control" />
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

UserForm = reduxForm({
    form: 'userForm'
})(UserForm)

const selector = formValueSelector('userForm');
UserForm = connect(state => {
    const UserTypeId = selector(state, 'UserTypeId');
    const RoleId = selector(state, 'RoleId');
    const SsoId = selector(state, 'SsoId');
    const KinId = selector(state, 'KinId');
    const FirstName = selector(state, 'FirstName');
    const LastName = selector(state, 'LastName');
    const CgEmail = selector(state, 'CgEmail');
    const SyfEmail = selector(state, 'SyfEmail');
    const DateOfBirth = selector(state, 'DateOfBirth');
    const Designation = selector(state, 'Designation');
    const Band = selector(state, 'Band');
    const Grade = selector(state, 'Grade');
    const SyfTower = selector(state, 'SyfTower');
    const SyfApplication = selector(state, 'SyfApplication');
    return {
        UserTypeId, RoleId, SsoId, KinId, FirstName, LastName, CgEmail, SyfEmail, 
        DateOfBirth, Designation, Band, Grade, SyfTower, SyfApplication
    }
})(UserForm)

export default UserForm;