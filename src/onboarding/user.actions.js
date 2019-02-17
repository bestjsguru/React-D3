import { toastr } from 'react-redux-toastr';
import { userConstants } from './user.constants';
import { userService } from './user.service';
import { history } from '../_common/helpers';
import { alertActions } from '../alert';

export const userActions = {
  login,
  logout,
  register,
  getTokenDetails,
  forgotPassword,
  getUser
};

const clearUserStatus = () => ({ type: userConstants.CLEAR_USER_STATUS });

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        (res) => {
          dispatch(success(res.message));
          dispatch(clearUserStatus());
          history.push('/accounts');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.data.message));
          // toastr.error(error.data.message);
        },
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(message) { return { type: userConstants.LOGIN_SUCCESS, message }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
  return (dispatch) => {
    userService.logout()
      .then(
        (res) => {
          dispatch({ type: userConstants.LOGOUT });
          history.push('/login');
        },
        (error) => {
          dispatch(alertActions.error(error.data.message));
          // toastr.error(error.data.message);
        }
      );
  };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        (user) => {
          dispatch(success());
          dispatch(clearUserStatus());
          history.push('/accounts');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.data.message));
          // toastr.error(error.data.message);
        },
      );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }
}

function getUser() {
  return (dispatch) => {
    dispatch(request());

    userService.getUser()
      .then(
        data => dispatch(success(data)),
        (error) => {
          dispatch(failure(error));
          // dispatch(alertActions.error(error.data.message));
          // toastr.error(error.data.message);
        },
      );
  };

  function request() { return { type: userConstants.GET_USER_REQUEST }; }
  function success(user) { return { type: userConstants.GET_USER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.GET_USER_FAILURE, error }; }
}

function getTokenDetails(token) {
  return (dispatch) => {
    dispatch(request());

    userService.getTokenDetails(token)
      .then(
        (data) => { 
          dispatch(success(data));
          console.log(`token details fetched = ${JSON.stringify(data)}`);
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.data.message));
          // toastr.error(error.data.message);
        },
      );
  };

  function request() { return { type: userConstants.TOKEN_DETAILS_REQUEST }; }
  function success(details) { return { type: userConstants.TOKEN_DETAILS_SUCCESS, details }; }
  function failure(error) { return { type: userConstants.TOKEN_DETAILS_FAILURE, error }; }
}

function forgotPassword(username) {
  return (dispatch) => {
    dispatch(request());
    userService.forgotPassword(username)
      .then(
        (res) => {
          dispatch(success());
        },
        (error) => {
          dispatch(failure());
        }
      );
  };

  function request() { return { type: userConstants.PASSWORD_RESET_REQUEST }; }
  function success() { return { type: userConstants.PASSWORD_RESET_SUCCESS }; }
  function failure() { return { type: userConstants.PASSWORD_RESET_FAILED }; }
}
