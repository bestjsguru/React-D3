import { userConstants } from './user.constants';

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        user: action.user,
      };
    case userConstants.GET_USER_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.CLEAR_USER_STATUS:
      return {};
    default:
      return state;
  }
}
