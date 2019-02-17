import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from './user.actions';
import { OnboardingHeader } from '../_common/components';
import Svg from '../_images/three-dots.svg';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { login } = this.props;

    if (username && password) {
      login(username, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="login-page">
        <OnboardingHeader />
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
            <input type="text" className="form-control" name="username" placeholder="Email" value={username} onChange={this.handleChange} />
            {submitted && !username &&
            <div className="help-block">Username is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
            <div className="help-block">Password is required</div>
                        }
          </div>

          <div className="abc-checkbox">
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1"> Remember me </label>
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Sign in</button>
            {loggingIn &&
              <div className="container-center">
                <img alt="" src={Svg} />
              </div>
            }
            <Link to="/forgot_password" className="btn btn-link">Forgot Password?</Link>

            <div className="warning-msg">
              <p>Warning:</p>
              <p>
              This system is restricted to authorized users for business purposes only.
              Unauthorized access or use is a violation of company policy and the law. 
              This system may be monitored for administrative and security reasons. 
              By proceeding, you acknowledge that (1) you have read and understand
                this notice and (2) you consent to the system monitoring.
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: userActions.login
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
