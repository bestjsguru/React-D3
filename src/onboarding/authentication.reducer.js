import { userConstants } from './user.constants';

const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};

    case userConstants.LOGOUT:
      return {};

    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};

    case userConstants.TOKEN_DETAILS_REQUEST:
      return { validatingToken: true };
    case userConstants.TOKEN_DETAILS_SUCCESS:
      return { tokenDetails: action.details };
    case userConstants.TOKEN_DETAILS_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
