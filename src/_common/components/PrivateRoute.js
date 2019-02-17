import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userActions } from '../../onboarding';
import { loadingGif } from '../constants';

class PrivateRoute extends React.Component {
  componentWillMount() {
    const { user, getUser } = this.props;

    console.log(`PrivateRoute will mount: user = ${JSON.stringify(user)}`);

    if (!user || !user.user || user.error) {
      getUser();
    }
  }

  render() {
    const {
      component: Component,
      user,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
        if (user.user) {
          console.log(`rendering component itself ${Component}`);
          return <Component {...props} />;
        } else if (user.error) {
          return <Redirect to="/login" />;
        } else {
          console.log(`user state is ${JSON.stringify(user)}`);
          return (
            <img src={loadingGif} />
          );
        }
      }}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: userActions.getUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
