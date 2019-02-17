import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from '../../dashboard';
import { AccountSelectionPage } from '../../onboarding';

class ProtectedLayout extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/accounts" component={AccountSelectionPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    );
  }
}

export default ProtectedLayout;
