import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Field } from 'redux-form';
import AutoSuggestion from '../common/AutoSuggestion';

export default class AddNewItem extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            fields: []
        };
    }

    addNewItem = () => { console.log('state fields before', this.state.fields);
        this.state.fields.push({});console.log('state fields after', this.state.fields);
        //this.renderNewItem();
    }

    renderNewItem = () => {
        this.state.fields.map((member, index) =>{ console.log('member: ', member);
            return <p>Rajesh</p>;
        });
    }

    render() {
        let fields = []; console.log('fields: ', fields);
        return (
            // <AutoSuggestion />
            <div className="form-group">
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <Button type="button" variant="primary" onClick={/*() => this.state.fields.push({})*/this.addNewItem.bind(this)}>Add Certification</Button>
                    </Col>
                </Row>
                <Row>
                    {this.renderNewItem.bind(this)}
                {this.state.fields.map((member, index) =>{ console.log('member: ', member);
                    return(
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
                                            <AutoSuggestion data="" />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="form-group">
                                    <Row>
                                        <Col md={4} sm={4} xs={12}>
                                            <label htmlFor="CertificationAuthority" className="col-form-label">Authority</label>
                                        </Col>
                                        <Col md={8} sm={8} xs={12}>
                                            <Field name={`${member}.CertificationAuthority`} component="input" type="text" placeholder="Authority" className="form-control" />
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )})}
                </Row>
            </div>
        );
    }
}
