import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Main from './Main';
import LoginPage from './components/login/loginFormPage';
import AuthenticateRoute from './components/login/authenticateRoute';

function App() {
  // const loginUserType = localStorage.hasOwnProperty('loginUserType') && JSON.parse(localStorage.getItem('loginUserType'));
  const loginUserType = sessionStorage.hasOwnProperty('loginUserType') && JSON.parse(sessionStorage.getItem('loginUserType'));
  return (
    <Switch>
      <Route path='/login' component={LoginPage} />
      <AuthenticateRoute path="/" component={Main} />
    </Switch>
  );
}

export default App;
