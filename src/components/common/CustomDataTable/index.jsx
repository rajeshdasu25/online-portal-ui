import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './CustomDataTableStyles.scss';
import { Badge, Col, Dropdown, DropdownButton, Image, Row } from 'react-bootstrap';

const isExpandableRow = (row) => {
    if (row.hasOwnProperty('expand')) return true;
    else return false;
};

const selectRow = {
    //mode: 'checkbox',
    //clickToSelect: true,
    clickToExpand: true
};

export default class ExpandRow extends React.Component {
  constructor(props) {
    super(props);
  }

  statusFormatter = (row) => {
    return (row === 1) ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Inactive</Badge>;
  }

  csvStatusFormatter = (row) => {
    return (row === 1) ? 'Active' : 'Inactive';
  }
  
  expandComponent(row) { 
    return (
      <>
        <Row>
          <Col md={3} xs={3}>&nbsp;</Col>
          <Col md={1} xs={6} sm={12}>Number</Col>
          <Col md={3} xs={6} sm={12}> : {row.Number}</Col>
        </Row>
        <Row>
          <Col md={3} xs={3}>&nbsp;</Col>
          <Col md={1} xs={6} sm={12}>Balance</Col>
          <Col md={3} xs={6} sm={12}> : {row.Balance}</Col>
        </Row>
        <Row>
          <Col md={3} xs={3}>&nbsp;</Col>
          <Col md={1} xs={6} sm={12}>Image</Col>
          <Col md={3} xs={6} sm={12}> : {row.Image ? row.Image : <Image src="holder.js/171x180" roundedCircle />}</Col>
        </Row>
      </>
    );
  }

  renderShowsTotal = (total) => {
    return (
      <span style={ { position: 'absolute', left: '5rem' } }>
        Total: <strong>{ total }</strong>&nbsp;items
      </span>
    );
  }

  handleTypeFilter = (itemType, event) => {
    switch(itemType) {
      case 'certificates': this.refs.authCol.applyFilter(event.target.value); break;
      case 'forms': this.refs.nameCol.applyFilter(event.target.value); break;
      case 'responses': this.refs.nameCol.applyFilter(event.target.value); break;
      default: this.refs.authCol.applyFilter(event.target.value); break;
    }
  }

  getCsvFileName = (itemType) => { 
      let csvFileName = 'spreadsheet.csv';
      switch (itemType) {
        case 'certificates': csvFileName = 'Certificates.csv'; break;
        case 'forms': csvFileName = 'Forms.csv'; break;
        case 'responses': csvFileName = 'Responses.csv'; break;
        case 'trainings': csvFileName = 'Trainings.csv'; break;
        case 'users': csvFileName = 'Employes.csv'; break;
        default: csvFileName = 'spreadsheet.csv'; break;
      }
      return csvFileName;
  }

  renderTableHeaders = (itemType) => {
    let headers;
    switch (itemType) {
      case 'certificates':
        headers = [
          { 'title': 'Id', 'dataField': '_id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'Name', 'dataField': 'certification_Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Authority', 'dataField': 'certification_Authority', 'ref': 'authCol', 'hidden': false, 'isKey': false },
          // { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false },
        ];
        break;
      case 'forms':
        headers = [
          { 'title': 'Id', 'dataField': 'id', 'ref': 'idCol', 'hidden': true, 'isKey': true },
          { 'title': 'Name', 'dataField': 'Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Description', 'dataField': 'Description', 'ref': 'descCol', 'hidden': false, 'isKey': false },
          { 'title': 'Creator', 'dataField': 'UserFullName', 'ref': 'usernameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Created', 'dataField': 'FormattedCreatedDate', 'ref': 'createdDateCol', 'hidden': false, 'isKey': false },
          { 'title': 'Closed', 'dataField': 'FormattedClosedDate', 'ref': 'closedDateCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat':this.statusFormatter },
        ];
        break;
      case 'responses':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true },
          { 'title': 'Form Name', 'dataField': 'FormName', 'ref': 'formCol', 'hidden': false, 'isKey': false  },
          { 'title': 'Creator', 'dataField': 'Creator', 'ref': 'creatorCol', 'hidden': false, 'isKey': false  },
          { 'title': 'Description', 'dataField': 'Description', 'ref': 'descCol', 'hidden': false, 'isKey': false  },
          { 'title': 'Date', 'dataField': 'FormattedDate', 'ref': 'dateCol', 'hidden': false, 'isKey': false  },
        ];
        break;
      case 'trainings':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'Name', 'dataField': 'Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Description', 'dataField': 'Description', 'ref': 'authCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat':this.statusFormatter },
        ];
        break;
      case 'users':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'SSO ID', 'dataField': 'SsoId', 'ref': 'ssoCol', 'hidden': false, 'isKey': false },
          { 'title': 'Type', 'dataField': 'UserType', 'ref': 'userTypeCol', 'hidden': false, 'isKey': false },
          { 'title': 'First Name', 'dataField': 'FirstName', 'ref': 'firstNameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Last Name', 'dataField': 'LastName', 'ref': 'lastNameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Email', 'dataField': 'EmailAddr', 'ref': 'emailCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat':this.statusFormatter },
        ];
        break;
    }
    return headers;
  }

  render() {
    const { accountTypes, forms, itemType } = this.props;
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ 
        { text: '2', value: 2 },
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },
        { text: 'All', value: this.props.data.length }
      ],
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      // paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      // paginationPosition: 'bottom'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };
    
    return (
      <div className="expandableTableContainer">
        {accountTypes && <DropdownButton id="dropdown-item-button" className="btn-filter" title="Filter" alignRight>
          {accountTypes.map((type, index) => {
              return (
                  <Dropdown.Item as="button" key={index} value={type.Name} 
                      onClick={this.handleTypeFilter.bind(this)}>
                      {type.Name}
                  </Dropdown.Item>
              );
          })}
        </DropdownButton>}
        {itemType && itemType === 'responses' && <DropdownButton id="dropdown-item-button" className="btn-filter" title="Filter" alignRight>
          {forms.map((type, index) => {
              return (
                  <Dropdown.Item as="button" key={index} value={type.Name} 
                      onClick={this.handleTypeFilter.bind(this, itemType)}>
                      {type.Name}
                  </Dropdown.Item>
              );
          })}
        </DropdownButton>}
        <BootstrapTable data={ this.props.data }
          search={ true }
          pagination={ true } 
          exportCSV={ true }
          csvFileName = { this.getCsvFileName(itemType) }
          // insertRow= { true }
          options={ options }
          expandableRow={ isExpandableRow }
          expandComponent={ this.expandComponent }
          expandColumnOptions={ { expandColumnVisible: true } }
          selectRow={selectRow} >
          {/* <TableHeaderColumn dataField='_id' isKey={true} hidden={true}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='certification_Name' ref='nameCol' filter={{ type: 'TextFilter', delay: 1000 }} dataSort>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='certification_Authority' ref='authCol' filter={{ type: 'TextFilter', delay: 1000 }} dataSort>Authority</TableHeaderColumn> */}
          {/* <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='name' ref='nameCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Name' dataSort>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='description' ref='descCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Description' dataSort>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='status' ref='statusCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Status' csvFormat={ this.csvStatusFormatter } dataFormat={ this.statusFormatter } dataSort>Status</TableHeaderColumn> */}
          {/* <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='formName' ref='nameCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Form Name' dataSort>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='userName' ref='userCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Resource Name' dataSort>Resource</TableHeaderColumn>
          <TableHeaderColumn dataField='description' ref='authCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Response' dataSort>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='status' ref='statusCol' filter={{ type: 'TextFilter', delay: 1000 }} csvHeader='Status' csvFormat={ this.csvStatusFormatter } dataSort dataFormat={this.statusFormatter}>Status</TableHeaderColumn> */}
          {/* <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn> */}
          {/* this.renderTableHeaders(itemType) */}
          {
            this.renderTableHeaders(itemType).map(
              function(header, index){
              return (
                <TableHeaderColumn key={index} 
                  ref={header.ref} 
                  dataField={header.dataField} 
                  isKey={header.isKey} 
                  hidden={header.hidden} 
                  filter={{ type: 'TextFilter', delay: 1000 }} 
                  csvHeader={header.title} 
                  // dataFormat={header.statusFormatter}
                  dataSort>{header.title}</TableHeaderColumn>
              )})
          }
        </BootstrapTable>
      </div>
    );
  }
}