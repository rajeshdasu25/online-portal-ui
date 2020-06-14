import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

function LeftNav() {
  const loginUserType = localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType'));
  const currentLocation = window.location.pathname;
  return (
    <div className="leftmenu">
      {(loginUserType === '1') ?
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li className={currentLocation === '/' ? 'active' : ''}><Link to="/">Dashboard</Link></li>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Masters
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {/* <li className={currentLocation === '/forms' ? 'active' : ''}><Link to="/forms">Forms</Link></li> */}
                  <li className={currentLocation === '/certifications' ? 'active' : ''}><Link to="/certifications">Certifications</Link></li>
                  <li className={currentLocation === '/roles' ? 'active' : ''}><Link to="/roles">Roles</Link></li>
                  <li className={currentLocation === '/skills' ? 'active' : ''}><Link to="/skills">Skills</Link></li>
                  <li className={currentLocation === '/trainings' ? 'active' : ''}><Link to="/trainings">Trainings</Link></li>
                  <li className={currentLocation === '/users' ? 'active' : ''}><Link to="/users">SSO Users</Link></li>
                </ul>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <li className={currentLocation === '/responses' ? 'active' : ''}><Link to="/responses">All Responses</Link></li>
          {/* <li className={currentLocation === '/reports' ? 'active' : ''}><Link to="/reports">Reports</Link></li> */}
        </ul>
        :
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li className={currentLocation === '/new-response' ? 'active' : ''}><Link to="/new-response">New Entry</Link></li>
          {/* <li className={currentLocation === '/skills' ? 'active' : ''}><Link to="/skills">Skill Metrics</Link></li> */}
          <li className={currentLocation === '/reports' ? 'active' : ''}><Link to="/responses">My Responses</Link></li>
        </ul>}
    </div>
  )
};

export default LeftNav;