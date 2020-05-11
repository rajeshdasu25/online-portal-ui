import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import AppHeader from './components/common/AppHeader';
import Footer from './components/common/Footer';
import LeftNav from './components/common/LeftNav';

import Dashboard from './components/dashboard';
import PageNotFound from './components/common/NotFound';
import ReportsPage from './components/reports';
import SkillsPage from './components/skills';
import ResponseFormPage from './components/responses/responseFormPage';
import ViewAllCertificates from './components/certificates/viewAllCertificates';
import ViewIndCertificate from './components/certificates/viewIndCertificate';
import ViewAllForms from './components/forms/viewAllForms';
import ViewIndForm from './components/forms/viewIndForm';
import ViewAllResponses from './components/responses/viewAllResponses';
import ViewIndResponse from './components/responses/viewIndResponse';
import ViewAllTrainings from './components/trainings/viewAllTrainings';
import ViewIndTraining from './components/trainings/viewIndTraining';
import ViewAllUsers from './components/users/viewAllUsers';

import './App.css';
import './Layout.scss';

function Main() {
  const [leftOpen, setLeftOpen] = useState('open');

  const toggleSidebar = (event) => {
    if(leftOpen === 'open') setLeftOpen('closed');
    else setLeftOpen('open');
  }

  return (
    <div className='App' id='layout'>
      <div id='left' className={leftOpen}>
        <div className='icon' onClick={toggleSidebar}>&equiv;</div>
        <div className={`sidebar ${leftOpen}`} >
          <div className='header'>Online Portal</div>
          <div className='content'>
            <LeftNav />
          </div>
        </div>
      </div>
      <div id='main'>
        <div className='header'>
          <AppHeader />
        </div>
        <div className='content main-container'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/certifications' component={ViewAllCertificates} />
            <Route path='/certification/:id' component={ViewIndCertificate} />
            <Route path='/new-response' component={ResponseFormPage} />
            <Route path='/forms' component={ViewAllForms} />
            <Route path='/form/:id' component={ViewIndForm} />
            <Route path='/reports' component={ReportsPage} />
            <Route path='/responses' component={ViewAllResponses} />
            <Route path='/response/:id' component={ViewIndResponse} />
            <Route path='/skills' component={SkillsPage} />
            <Route path='/trainings' component={ViewAllTrainings} />
            <Route path='/training/:id' component={ViewIndTraining} />
            <Route path='/users' component={ViewAllUsers} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;
