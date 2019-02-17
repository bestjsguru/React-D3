import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { history } from '../helpers';
import { alertActions } from '../../alert';
import logo from '../../_images/logo_light_bg.png';

export class OnboardingHeader extends React.Component {
  constructor(props) {
    super(props);

    const { clearAlert } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      clearAlert();
    });
  }

  render() {
    const { alert } = this.props;

    return (
      <div>
        <div className="ps-logo-container">
          <img src={logo} className="ps-logo" />
        </div>
        <div>
          { alert && alert.message && alert.type == 'alert-danger' &&
          <span className="help-block">{alert.message}</span>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearAlert: alertActions.clear
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingHeader);

