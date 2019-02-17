import { userConstants } from './user.constants';

export function forgotPasswordState(state = {}, action) {
  switch (action.type) {
    case userConstants.PASSWORD_RESET_REQUEST:
      return {
        loading: true
      };
    case userConstants.PASSWORD_RESET_SUCCESS:
      return {
        result: true,
      };
    case userConstants.PASSWORD_RESET_FAILED:
      return {
        result: false,
      };
    default:
      return state;
  }
}
