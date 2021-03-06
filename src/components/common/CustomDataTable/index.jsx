import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './CustomDataTableStyles.scss';
import { /*Accordion,*/ Badge, Card, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';

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
    this.state = {
      isDataFetched: false
    };
  }

  isExpandableRow = (row) => {
    if (row.hasOwnProperty('expand')) return true;
    else return false;
  };

  statusFormatter = (row) => {
    return (row === 1) ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Inactive</Badge>;
  }

  csvStatusFormatter = (row) => {
    return (row === 1) ? 'Active' : 'Inactive';
  }

  renderProficiencyLevel = (level) => {
    switch(level) {
      case 1: return 'Novice'; break;
      case 2: return 'Beginner'; break;
      case 3: return 'Competant'; break;
      case 4: return 'Proficient'; break;
      case 5: return 'Expert'; break;
    }
  }

  expandComponent(row) {
    return (
      <>
        <Row>
          <Col md={4} sm={12} xs={12}>
            <Card bg="light" className="certification-ctr">
              <Card.Header>
                <Row>
                  <Col md={10} sm={10} xs={12}>
                    <span style={{ 'fontWeight': 'bold', 'color': '#fff' }}>Certifications</span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div id="certifications"><ul id="certifications">
                  {(row.certifications.length > 0) && row.certifications.map((certification, index) => {
                    return (
                      <li key={index}>{certification.name}</li>
                    );
                  })}
                </ul></div>
                {(row.certifications.length === 0) && <Row>
                  <Col className="text-center text-danger font-weight-bold">No data found..!!!</Col>
                </Row>
                }
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Card bg="light" className="certification-ctr">
              <Card.Header>
                <Row>
                  <Col md={10} sm={10} xs={12}>
                    <span style={{ 'fontWeight': 'bold', 'color': '#fff' }}>Trainings</span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div id="trainings"><ul>
                  {(row.trainings.length > 0) && row.trainings.map((training, index) => {
                    return (
                      <li key={index}>{training.name}</li>
                    );
                  })}
                </ul></div>
                {(row.trainings.length === 0) && <Row>
                  <Col className="text-center text-danger font-weight-bold">No data found..!!!</Col>
                </Row>
                }
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Card bg="light" className="certification-ctr">
              <Card.Header>
                <Row>
                  <Col md={10} sm={10} xs={12}>
                    <span style={{ 'fontWeight': 'bold', 'color': '#fff' }}>Skills</span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                {(row.skills.length > 0) && row.skills.map((skill, index) => {
                  return (
                    <Row key={index}>
                      <Col md={6} sm={6} xs={6} className="text-right font-weight-bold">{Object.keys(skill)[0]}&nbsp;:&nbsp;</Col>
                      <Col md={6} sm={6} xs={6}>{Object.values(skill)[0]}</Col>
                      {/* <Col md={6} sm={6} xs={6}>
                        {() => {
                            let level;console.log('Object.values(skill)[0]: ', Object.values(skill)[0]);
                            switch(Object.values(skill)[0]) {
                              case '1': level = 'Novice';
                              case '2': level = 'Beginner';
                              case '3': level = 'Competant';
                              case '4': level = 'Proficient';
                              case '5': level = 'Expert';
                            }
                            return level;
                        }}
                      </Col> */}
                    </Row>
                  );
                })}
                {(row.skills.length === 0) && <Row>
                  <Col className="text-center text-danger font-weight-bold">No data found..!!!</Col>
                </Row>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  renderShowsTotal = (total) => {
    return (
      <span style={{ position: 'absolute', left: '5rem' }}>
        Total: <strong>{total}</strong>&nbsp;items
      </span>
    );
  }

  handleTypeFilter = (itemType, event) => {
    switch (itemType) {
      case 'certificates': this.refs.authCol.applyFilter(event.target.value); break;
      case 'forms': this.refs.nameCol.applyFilter(event.target.value); break;
      case 'responses': this.refs.nameCol.applyFilter(event.target.value); break;
      default: this.refs.authCol.applyFilter(event.target.value); break;
    }
  }

  enableExportCsv = (itemType) => {
    return (itemType === 'responses') ? false : true;
  }

  getCsvFileName = (itemType) => {
    let csvFileName = 'spreadsheet.csv';
    switch (itemType) {
      case 'certificates': csvFileName = 'Certificates.csv'; break;
      case 'forms': csvFileName = 'Forms.csv'; break;
      case 'reports': csvFileName = 'Reports.csv'; break;
      case 'responses': csvFileName = 'Responses.csv'; break;
      case 'roles': csvFileName = 'Roles.csv'; break;
      case 'skills': csvFileName = 'Skills.csv'; break;
      case 'trainings': csvFileName = 'Trainings.csv'; break;
      case 'users': csvFileName = 'Employes.csv'; break;
      default: csvFileName = 'spreadsheet.csv'; break;
    }
    return csvFileName;
  }

  renderTableHeaders = (itemType) => {
    let headers;
    switch (itemType) {
      // case 'certificates':
      //   headers = [
      //     { 'title': 'Id', 'dataField': '_id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
      //     { 'title': 'Name', 'dataField': 'certification_Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
      //     { 'title': 'Authority', 'dataField': 'certification_Authority', 'ref': 'authCol', 'hidden': false, 'isKey': false },
      //     // { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false },
      //   ];
      //   break;
      case 'certificates':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'Name', 'dataField': 'Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Authority', 'dataField': 'Authority', 'ref': 'authCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false },
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
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat': this.statusFormatter },
        ];
        break;
      case 'proficiencies':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'Name', 'dataField': 'Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Value', 'dataField': 'Value', 'ref': 'valueCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false },
        ];
        break;
      // case 'responses':
      //   headers = [
      //     { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true },
      //     { 'title': 'Form Name', 'dataField': 'FormName', 'ref': 'formCol', 'hidden': false, 'isKey': false },
      //     { 'title': 'Creator', 'dataField': 'Creator', 'ref': 'creatorCol', 'hidden': false, 'isKey': false },
      //     { 'title': 'Description', 'dataField': 'Description', 'ref': 'descCol', 'hidden': false, 'isKey': false },
      //     { 'title': 'Date', 'dataField': 'FormattedDate', 'ref': 'dateCol', 'hidden': false, 'isKey': false },
      //   ];
      //   break;
      case 'reports':
      case 'responses':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true },
          { 'title': 'SSO ID', 'dataField': 'ssoId', 'ref': 'ssoIdCol', 'hidden': false, 'isKey': false },
          { 'title': 'Full Name', 'dataField': 'fullName', 'ref': 'fullNameCol', 'hidden': false, 'isKey': false },
          // { 'title': 'Skills', 'dataField': 'skills', 'ref': 'skillsCol', 'hidden': false, 'isKey': false },
          // { 'title': 'Trainings', 'dataField': 'trainings', 'ref': 'trainingsCol', 'hidden': false, 'isKey': false },
          { 'title': 'Date Time', 'dataField': 'dateTime', 'ref': 'dateTimeCol', 'hidden': false, 'isKey': false },
        ];
        break;
      case 'roles':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true },
          { 'title': 'Name', 'dataField': 'Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Display Name', 'dataField': 'DisplayName', 'ref': 'displayNameCol', 'hidden': false, 'isKey': false },
        ];
        break;
      case 'skills':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true },
          { 'title': 'Name', 'dataField': 'DisplayName', 'ref': 'displayNameCol', 'hidden': false, 'isKey': false },
          // { 'title': 'Role', 'dataField': 'RoleName', 'ref': 'roleNameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat': this.statusFormatter },
        ];
        break;
      case 'trainings':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'Name', 'dataField': 'Name', 'ref': 'nameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Description', 'dataField': 'Description', 'ref': 'authCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat': this.statusFormatter },
        ];
        break;
      case 'users':
        headers = [
          { 'title': 'Id', 'dataField': 'Id', 'ref': 'idCol', 'hidden': true, 'isKey': true, 'csvHeader': 'Id' },
          { 'title': 'SSO ID', 'dataField': 'SsoId', 'ref': 'ssoCol', 'hidden': false, 'isKey': false },
          { 'title': 'KIN ID', 'dataField': 'KinId', 'ref': 'ssoCol', 'hidden': false, 'isKey': false },
          { 'title': 'Type', 'dataField': 'UserType', 'ref': 'userTypeCol', 'hidden': false, 'isKey': false },
          { 'title': 'Role', 'dataField': 'RoleName', 'ref': 'roleCol', 'hidden': false, 'isKey': false },
          { 'title': 'First Name', 'dataField': 'FirstName', 'ref': 'firstNameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Last Name', 'dataField': 'LastName', 'ref': 'lastNameCol', 'hidden': false, 'isKey': false },
          { 'title': 'Email', 'dataField': 'SyfEmail', 'ref': 'emailCol', 'hidden': false, 'isKey': false },
          { 'title': 'Status', 'dataField': 'ActiveStatus', 'ref': 'statusCol', 'hidden': false, 'isKey': false, 'dataFormat': this.statusFormatter },
        ];
        break;
    }
    return headers;
  }

  setNoDataText() {
    if (this.state.isDataFetched) {
      return "There is no data to display..!!!";
    }
  }

  render() {
    const { forms, itemType } = this.props;

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
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      noDataText: this.setNoDataText(), //'There is no data to display',
      // paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      // paginationPosition: 'bottom'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    return (
      <div className="expandableTableContainer">
        {/* {itemType && itemType === 'responses' && <DropdownButton id="dropdown-item-button" className="btn-filter" title="Filter" alignRight>
          {forms.map((type, index) => {
            return (
              <Dropdown.Item as="button" key={index} value={type.Name}
                onClick={this.handleTypeFilter.bind(this, itemType)}>
                {type.Name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>} */}
        {/* {itemType && itemType !== 'reports' && <Button className="btn-addnew" size="sm" variant="primary" onClick={() => this.handleShowModal('addCertificate', true)}>Add New</Button>}
        {itemType && itemType === 'certificates' && <Button className="btn-addnew" size="sm" variant="primary" onClick={() => this.handleShowModal('addCertificate', true)}>Add New</Button>}
        {itemType && itemType === 'roles' && <Button className="btn-addnew" size="sm" variant="primary" onClick={() => this.handleShowModal('addRole', true)}>Add New</Button>}
        {itemType && itemType === 'skills' && <Button className="btn-addnew" size="sm" variant="primary" onClick={() => this.handleShowModal('addSkill', true)}>Add New</Button>}
        {itemType && itemType === 'trainings' && <Button className="btn-addnew" size="sm" variant="primary" onClick={() => this.handleShowModal('addTraining', true)}>Add New</Button>} */}
        {this.props.data && (this.props.data.length > 0) && <BootstrapTable data={this.props.data}
          search={true}
          pagination={true}
          exportCSV={this.enableExportCsv(itemType)}
          csvFileName={this.getCsvFileName(itemType)}
          // insertRow= { (itemType === 'trainings' || itemType === 'certificates') ? true : false }
          options={options}
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent}
          expandColumnOptions={{ expandColumnVisible: true }}
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
              function (header, index) {
                return (
                  <TableHeaderColumn key={index}
                    ref={header.ref}
                    dataField={header.dataField}
                    isKey={header.isKey}
                    hidden={header.hidden}
                    filter={{ type: 'TextFilter', delay: 1000 }}
                    csvHeader={header.title}
                    dataFormat={header.statusFormatter}
                    dataSort>{header.title}</TableHeaderColumn>
                )
              })
          }
        </BootstrapTable>}
      </div>
    );
  }
}