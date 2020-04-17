import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import FilterForm from './filterForm';

class ViewSpentSummary extends React.Component {
    submit = formValues => {
        //this.props.fetchSpendSummary(formValues);
    }

    render() {

        const createTable = () => {
            let table = [];

            for (let i = 0; i < 10; i++) {
                table.push(
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>Title {i + 1}</td>
                        <td>Name {i + 1}</td>
                        <td>Description {i + 1}</td>
                    </tr>)
            }
            return table
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>Reports</title>
                </Helmet>
                <FilterForm onSubmit={this.submit} {...this.props} />
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <Card>
                            <Card.Body>
                                <Button variant="primary">Export to CSV</Button>
                                <table className="table table-bordered table-striped" style={{ 'margin': '0.5rem 0' }} >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {createTable()}
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(null, null
    // mapStateToProps,
    // mapDispatchToProps
)(ViewSpentSummary);