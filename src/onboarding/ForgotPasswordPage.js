import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from './user.actions';
import { OnboardingHeader } from '../_common/components';
import Svg from "../_images/three-dots.svg"; 

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username } = this.state;
    const { forgotPassword } = this.props;

    if (username) {
      forgotPassword(username);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, submitted } = this.state;
    const { forgotPasswordState } = this.props;
    return (
      <div className="login-page">
        <OnboardingHeader />
        {!forgotPasswordState.result &&
          <form name="form" onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="username" placeholder="Email" onChange={this.handleChange} />
            {!username && submitted &&
            <div className="help-block">Username is required</div>
            }
            <div className="form-group">
              <button className="btn btn-primary">Submit</button>
              <div className="warning-msg">
                <p>
                  Enter your respective email registered with Petasesnse
                  and click on submit. Follow the instructions to
                  reset your password.
                </p>
              </div>
            </div>
          </form>
        }
        {!forgotPasswordState.result && typeof (forgotPasswordState.result) === 'boolean' &&
          <div className="form-group">
            <div className="warning-msg" style={{ color: 'red' }}>
              The provided email is not associated with any account.<br />
              Please check and resend again.
            </div>
          </div>
        }
        {forgotPasswordState.loading &&
          <div className="container-center">
            <img alt="" src={Svg} />
          </div>
        }
        {forgotPasswordState.result &&
          <div className="form-group">
            <div className="warning-msg">
              <p style={{ color: 'black', fontSize: '16px' }}>
                Password reset instructions has been sent your e-mail successfully.
                Please follow instructions to reset the password.
              </p>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { forgotPasswordState } = state;
  return {
    forgotPasswordState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    forgotPassword: userActions.forgotPassword
  }, dispatch);
}
// style={{ marginLeft: '160px' }}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
