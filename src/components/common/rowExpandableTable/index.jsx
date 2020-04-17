import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './rowExpandableTableStyles.scss';
import { Row, Col } from 'react-bootstrap';

const isExpandableRow = (row) => {
    if (row.hasOwnProperty('expand')) return true;
    else return false;
};

const isDataSort = (row) => {
    // if (row.hasOwnProperty('expand')) return true;
    // else return false;
    return true;
};

const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToExpand: true
};

const cellEdit = {
    mode: 'click'
};

export default class ExpandRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  expandComponent(row) { 
    return (
      <>
        <Row>
          <Col md={3} xs={6} sm={12}>Account</Col>
          <Col md={3} xs={6} sm={12}>: {row.AccountName}</Col>
          <Col md={3} xs={6} sm={12}>Updated Time</Col>
          <Col md={3} xs={6} sm={12}>: {row.FormattedUpdatedDate}</Col>
        </Row>
        <Row>
          <Col md={3} xs={6} sm={12}>Description</Col>
          <Col md={9} xs={6} sm={12}>: {row.Description}</Col>
        </Row>
      </>
    );
  }

  render() {
    /*const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };*/
    
    return (
      <div className="expandableTableContainer">
        <BootstrapTable data={ this.props.data }
          /*options={ options }*/
          expandableRow={ isExpandableRow }
          expandComponent={ this.expandComponent }
          expandColumnOptions={ { expandColumnVisible: true } }
          /*selectRow={selectRow}
          /*cellEdit={cellEdit}*/>
          <TableHeaderColumn dataField='Id' isKey={ true }>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='Title'>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='Amount'>Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='TransactionType'>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='CategoryName'>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='FormattedTransactionDate' dataSort={isDataSort}>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}