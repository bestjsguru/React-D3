import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../onboarding/user.actions';

class HomePage extends React.Component {

  render() {
    const { user, logout } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <p>
          <a onClick={logout}>Logout</a>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: userActions.logout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
