
import { combineReducers } from 'redux';
import { reducer as toastReducer } from 'react-redux-toastr';

import { authentication } from '../onboarding/authentication.reducer';
import { user } from '../onboarding/user.reducer';
import { forgotPasswordState } from '../onboarding/forgotPassword.reducer';
import { toggle } from '../chart/toggle.reducer';
import { alert } from '../alert';

export const rootReducer = combineReducers({
  authentication,
  user,
  alert,
  toggle,
  forgotPasswordState,
  toastr: toastReducer
});

export default rootReducer;
