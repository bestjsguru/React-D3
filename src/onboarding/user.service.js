import { axiosInstance } from '../_common/constants';

export const userService = {
  login,
  logout,
  register,
  getTokenDetails,
  forgotPassword,
  getUser
};

function login(username, password) {
  return handleResponse(axiosInstance.post('login', JSON.stringify({ username, password })));
}

function register(user) {
  return handleResponse(axiosInstance.post('signup'), JSON.stringify(user));
}

function getTokenDetails(token) {
  return handleResponse(axiosInstance.post('signup-token-details', JSON.stringify({ token })));
}

function getUser() {
  return handleResponse(axiosInstance.get('get-current-user'));
}

function logout() {
  return handleResponse(axiosInstance.get('logout'));
}

function forgotPassword(username) {
  return handleResponse(axiosInstance.post('forgot-password', JSON.stringify({ username })));
}

function handleResponse(axiosPromise) {
  return axiosPromise
    .then((response) => {
      // console.log(`response headers: ${JSON.stringify(response.headers)}`);
      return response.data;
    })
    .catch((error) => {
      console.log(`api call failed: ${error}`);
      return Promise.reject(error.response);
    });
}
