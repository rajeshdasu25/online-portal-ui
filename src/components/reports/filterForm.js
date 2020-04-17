import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';

let FilterForm = props => {
    const { FilterTypeValue, handleSubmit, pristine, submitting } = props;
    const FilterTypeOptions = [
        { text: 'Form', value: 'Form' },
        { text: 'Certification', value: 'Certification' },
        { text: 'Training', value: 'Training' },
        { text: 'User', value: 'User' }
    ];
    const FormOptions = [
        { text: 'Form - 1', value: '1' },
        { text: 'Form - 2', value: '2' },
        { text: 'Form - 3', value: '3' },
        { text: 'Form - 4', value: '4' },
        { text: 'Form - 5', value: '5' },
    ];
    const CertificationOptions = [
        { text: 'Certification - 1', value: '1' },
        { text: 'Certification - 2', value: '2' },
        { text: 'Certification - 3', value: '3' },
        { text: 'Certification - 4', value: '4' },
        { text: 'Certification - 5', value: '5' },
    ];
    const TrainingOptions = [
        { text: 'Training - 1', value: '1' },
        { text: 'Training - 2', value: '2' },
        { text: 'Training - 3', value: '3' },
        { text: 'Training - 4', value: '4' },
        { text: 'Training - 5', value: '5' },
    ];
    const UserOptions = [
        { text: 'User - 1', value: '1' },
        { text: 'User - 2', value: '2' },
        { text: 'User - 3', value: '3' },
        { text: 'User - 4', value: '4' },
        { text: 'User - 5', value: '5' },
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
                    {FilterTypeValue && FilterTypeValue === 'Form' && <Col md={3} sm={3} xs={3}>
                        <Field name="FormId" component="select" className="form-control" >
                            <option value=''>Select Form</option>
                            {FormOptions.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </Field>
                    </Col>}
                    {FilterTypeValue && FilterTypeValue === 'Certification' && <Col md={3} sm={3} xs={3}>
                        <Field name="CertificationId" component="select" className="form-control" >
                            <option value=''>Select Certification</option>
                            {CertificationOptions.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </Field>
                    </Col>}
                    {FilterTypeValue && FilterTypeValue === 'Training' && <Col md={3} sm={3} xs={3}>
                        <Field name="TrainingId" component="select" className="form-control" >
                            <option value=''>Select Training</option>
                            {TrainingOptions.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </Field>
                    </Col>}
                    {FilterTypeValue && FilterTypeValue === 'User' && <Col md={3} sm={3} xs={3}>
                        <Field name="UserId" component="select" className="form-control" >
                            <option value=''>Select User</option>
                            {UserOptions.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.text}
                                </option>
                            ))}
                        </Field>
                    </Col>}
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