import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';

let FilterForm = props => {
    const {
        /*FilterTypeValue, */handleSubmit, pristine, submitting
    } = props;

    const FilterTypeOptions = [
        { text: 'Form', value: 'Form' },
        { text: 'Certification', value: 'Certification' },
        { text: 'Training', value: 'Training' },
        { text: 'User', value: 'User' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <Row>
                    <Col md={3} sm={3} xs={3}>
                        <Field name="FilterType" component="select" className="form-control" >
                            <option value=''>Filter Type</option>
                            {FilterTypeOptions.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </Field>
                    </Col>
                    {/* {FilterTypeValue && FilterTypeValue === 'Form' && <Col md={3} sm={3} xs={3}>
                        <Field name="FormId" component="select" className="form-control" >
                            <option value=''>Select Form</option>
                            {forms.map(item => (
                                <option key={item.Id} value={item.Id}>
                                    {item.Name}
                                </option>
                            ))}
                        </Field>
                    </Col>}
                    {FilterTypeValue && FilterTypeValue === 'Certification' && <Col md={3} sm={3} xs={3}>
                        <Field name="CertificationId" component="select" className="form-control" >
                            <option value=''>Select Certification</option>
                            {certificates.map(item => (
                                <option key={item._id} value={item._id}>
                                    {item.certification_Name}
                                </option>
                            ))}
                        </Field>
                    </Col>}
                    {FilterTypeValue && FilterTypeValue === 'Training' && <Col md={3} sm={3} xs={3}>
                        <Field name="TrainingId" component="select" className="form-control" >
                            <option value=''>Select Training</option>
                            {trainings.map(item => (
                                <option key={item.Id} value={item.Name}>
                                    {item.Name}
                                </option>
                            ))}
                        </Field>
                    </Col>}
                    {FilterTypeValue && FilterTypeValue === 'User' && <Col md={3} sm={3} xs={3}>
                        <Field name="UserId" component="select" className="form-control" >
                            <option value=''>Select User</option>
                            {users.map(item => (
                                <option key={item.Id} value={item.Id}>
                                    {item.FirstName} {item.LastName}
                                </option>
                            ))}
                        </Field>
                    </Col>} */}
                    <Col md={3} sm={3} xs={3}>
                        <Button type="submit" variant="primary" className="formBtns" disabled={pristine || submitting}>Generate</Button>
                    </Col>
                </Row>
            </div>
        </form>
    )
}

FilterForm = reduxForm({
    form: 'filterForm'
})(FilterForm)

const selector = formValueSelector('filterForm');
FilterForm = connect(state => {
    const FilterTypeValue = selector(state, 'FilterType');
    const FinancialYear = selector(state, 'FinancialYear');
    const Yearly = selector(state, 'Yearly');
    return {
        FilterTypeValue, FinancialYear, Yearly
    }
})(FilterForm)

export default FilterForm