import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import './App.css';
import { history } from '../_common/helpers';
import { PrivateRoute, ProtectedLayout } from '../_common/components';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '../onboarding';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-sm-4 col-sm-offset-4 col-xs-8 col-xs-offset-2">
          <Router history={history}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/forgot_password" component={ForgotPasswordPage} />
              <PrivateRoute path="/" component={ProtectedLayout} />
            </Switch>
          </Router>
        </div>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
      </div>
    );
  }
}

export default (App);
