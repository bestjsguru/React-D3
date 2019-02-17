import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from './user.actions';

class AccountSelectionPage extends React.Component {

  render() {
    const { user } = this.props;

    const userObj = user ? user.user : null;
    const accounts = userObj ? userObj.accounts : null;

    return (
      <div className="col-md-6 col-md-offset-3">
        {user.loading && <em>Loading Accounts...</em>}
        {user.error && <span className="text-danger">ERROR: {user.error}</span>}
        {accounts &&
          <ul>
            {accounts.map((account, index) => (<li> {`${account.id} ${account.name}`} </li>))}
          </ul>
        }
        <p>
          <Link to="/">Close</Link>
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
    getUser: userActions.getUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelectionPage);
