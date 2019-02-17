import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies } from 'react-cookie';
import * as qs from 'query-string';

import { userActions } from './user.actions';
import { alertActions } from '../alert/';
import { OnboardingHeader } from '../_common/components';
import { loadingGif } from '../_common/constants';

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const queryParams = qs.parse((this.props.location || {}).search);
    const signupToken = queryParams.token;

    const { cookies, sendAlert, getTokenDetails } = this.props;

    if (signupToken) {
      cookies.set('signup_token', signupToken);
      console.log(`Signup token from url is: ${signupToken}`)
    }

    const savedToken = cookies.get('signup_token');
    if (savedToken) {
      console.log(`saved token from cookie is: ${savedToken}`)

      getTokenDetails(savedToken);
    } else {
      sendAlert('Required parameter "token" not found.');
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user, register } = this.state;
    if (user.firstName && user.lastName && user.username && user.password && user.company && user.phone) {
      register(user);
    }
  }

  render() {
    const { user, submitted } = this.state;
    const { registering, tokenDetails } = this.props;
    const { email, account_name } = tokenDetails || {};
    return (
      <div className="register-page">
        <OnboardingHeader />
        <form name="form" onSubmit={this.handleSubmit}>
          <div>
            <span className="help-block info">* Required</span>
          </div>
          <div className={`form-group${submitted && !user.firstName ? ' has-error' : ''}`}>
            <input type="text" className="form-control" name="firstName" placeholder="First name*" value={user.firstName} onChange={this.handleChange} />
            {submitted && !user.firstName &&
            <div className="help-block">First Name is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !user.lastName ? ' has-error' : ''}`}>
            <input type="text" className="form-control" name="lastName" placeholder="Last name*" value={user.lastName} onChange={this.handleChange} />
            {submitted && !user.lastName &&
            <div className="help-block">Last Name is required</div>
                        }
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="username" placeholder="Email*" value={email} onChange={this.handleChange} disabled />
          </div>
          <div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
            <input type="password" className="form-control" name="password" placeholder="Password*" value={user.password} onChange={this.handleChange} />
            {submitted && !user.password &&
            <div className="help-block">Should be at least 8 characters with at least 1 digit, 1 lowercase and 1 uppercase character. Allowed special characters ($@!%*?#&)</div>
                        }
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="company" placeholder="Company*" value={account_name} onChange={this.handleChange} disabled />
          </div>
          <div className={`form-group${submitted && !user.phone ? ' has-error' : ''}`}>
            <input type="phone" className="form-control" name="phone" placeholder="+1 1234567890*" value={user.phone} onChange={this.handleChange} />
            {submitted && !user.phone &&
            <div className="help-block">Please enter valid phone number. Number format is "+1 1234567890"</div>
                        }
          </div>

          <div className="abc-checkbox">
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1">I agree to Petasense's </label>
            <Link to="/terms" className="btn btn-link">Terms & Conditions</Link>
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Sign up</button>
            {registering &&
            <img src={loadingGif} />
                        }
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering, tokenDetails } = state.authentication;
  return {
    registering,
    tokenDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    register: userActions.register,
    getTokenDetails: userActions.getTokenDetails,
    sendAlert: alertActions.error,
  }, dispatch);
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
