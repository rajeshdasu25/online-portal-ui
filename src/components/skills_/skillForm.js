import React from 'react'
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector, Radio } from 'redux-form';
import { Button, Card, Col, Row } from 'react-bootstrap';

const ProficiencyOptions = [
    { text: 'Novice', value: '0' },
    { text: 'Beginner', value: '1' },
    { text: 'Competant', value: '2' },
    { text: 'Proficient', value: '3' },
    { text: 'Expert', value: '4' }
];

const renderMultipleRadios = ({ onChange }) => (
    ProficiencyOptions.map((radio, index) => {
        return (
            <Col md={2} sm={2} xs={2} key={index}>
                <Field
                    name="job_title_id"
                    component="input"
                    type="radio"
                    onChange={() => {
                        onChange(radio.value)
                    }}
                    // checked={index === radio.value}
                />
            </Col>
        )
    }
    )
);

let SkillForm = props => {
    const {
        handleSubmit, pristine, submitting, reset, 
        RoleTypeValue, onChange
    } = props;

    const RoleTypeOptions = [
        { text: 'Frontend Developer', value: 'ui' },
        { text: 'JAVA Developer', value: 'java' },
        { text: 'DevOPS Engineer', value: 'devops' }
    ];

    const ProficiencyOptions = [
        { text: 'Novice', value: '0' },
        { text: 'Beginner', value: '1' },
        { text: 'Competant', value: '2' },
        { text: 'Proficient', value: '3' },
        { text: 'Expert', value: '4' }
    ];

    const FrontendOptions = [
        { text: 'HTML 5', value: 'html5' },
        { text: 'CSS 3', value: 'css3' },
        { text: 'Javascript', value: 'javascript' },
        { text: 'jQuery', value: 'jquery' },
        { text: 'Angular', value: 'angular' },
        { text: 'React', value: 'react' }
    ];

    const JavaOptions = [
        { text: 'JAVA', value: 'java' },
        { text: 'Spring', value: 'spring' },
        { text: 'Hybernet', value: 'hybernet' },
        { text: 'SQL', value: 'sql' },
        { text: 'MySQL', value: 'mysql' },
        { text: 'PostgreSQL', value: 'postgresql' }
    ];

    const DevOpsOptions = [
        { text: 'CI & CD', value: 'cicd' },
        { text: 'AWS', value: 'aws' },
        { text: 'jenkins', value: 'jenkins' },
        { text: 'newrelic', value: 'newrelic' }
    ];

    return (
        <Row>
            <Col md={12} sm={12} xs={12}>
                <Card>
                    <Card.Header><h5>Skills</h5></Card.Header>
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Row>
                                    {/* <Col md={1} sm={1} xs={1}>
                                        Role &nbsp; :
                                    </Col> */}
                                    <Col md={3} sm={3} xs={3}>
                                        <Field name="RoleType" component="select" className="form-control" >
                                            <option value=''>Role</option>
                                            {RoleTypeOptions.map(item => (
                                                <option key={item.value} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </Field>
                                    </Col>
                                    <Col md={3} sm={3} xs={3}>
                                        <Button type="submit" variant="primary" className="formBtns" disabled={pristine || submitting}>Submit</Button>
                                        <Button type="button" variant="secondary" className="formBtns" disabled={pristine || submitting} onClick={reset}>Clear</Button>
                                    </Col>
                                </Row>
                            </div>
                            {RoleTypeValue && <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={3}>
                                        &nbsp;
                                    </Col>
                                    <Col md={9} sm={9} xs={9}>
                                        <Row className="text-center">
                                            {ProficiencyOptions.map((item, index) => (
                                                <Col md={2} sm={2} xs={2} key={index}>
                                                    <span style={{ 'fontWeight': 'bold' }}>{item.text}</span>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </div>}
                            {/* <div className="form-group">
                                <Row>
                                    <Col md={3} sm={3} xs={3}>
                                        asd
                                    </Col>
                                    <Col md={9} sm={9} xs={9}>
                                        <Row className="text-center">
                                            <FieldArray
                                                name="radiosExample" component={renderMultipleRadios}
                                                props={{
                                                    onChange: props.onChange
                                                }} />
                                        </Row>
                                    </Col>
                                </Row>
                            </div> */}
                            {RoleTypeValue && RoleTypeValue==='ui' && FrontendOptions.map((item, index) => (
                                <div className="form-group" key={index}>
                                    <Row>
                                        <Col md={3} sm={3} xs={3}>
                                            {item.text}
                                        </Col>
                                        <Col md={9} sm={9} xs={9}>
                                            <Row className="text-center">
                                                <FieldArray
                                                    name="radiosExample" component={renderMultipleRadios}
                                                    props={{
                                                        onChange: props.onChange
                                                    }} />
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            {RoleTypeValue && RoleTypeValue==='java' && JavaOptions.map((item, index) => (
                                <div className="form-group" key={index}>
                                    <Row>
                                        <Col md={3} sm={3} xs={3}>
                                            {item.text}
                                        </Col>
                                        <Col md={9} sm={9} xs={9}>
                                            <Row className="text-center">
                                                <FieldArray
                                                    name="radiosExample" component={renderMultipleRadios}
                                                    props={{
                                                        onChange: props.onChange
                                                    }} />
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            {RoleTypeValue && RoleTypeValue==='devops' && DevOpsOptions.map((item, index) => (
                                <div className="form-group" key={index}>
                                    <Row>
                                        <Col md={3} sm={3} xs={3}>
                                            {item.text}
                                        </Col>
                                        <Col md={9} sm={9} xs={9}>
                                            <Row className="text-center">
                                                <FieldArray
                                                    name="radiosExample" component={renderMultipleRadios}
                                                    props={{
                                                        onChange: props.onChange
                                                    }} />
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

SkillForm = reduxForm({
    form: 'skillForm'
})(SkillForm)

const selector = formValueSelector('skillForm');
SkillForm = connect(state => {
    const RoleTypeValue = selector(state, 'RoleType');
    return {
        RoleTypeValue
    }
})(SkillForm)

export default SkillForm