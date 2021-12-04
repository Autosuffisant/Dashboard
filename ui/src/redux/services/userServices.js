/* eslint-disable import/no-cycle */
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  apiClient,
  handleResponse,
} from './axios';

function login(email, password) {
  return axios.post('user/login', { email, password })
    .then(handleResponse)
    .then((user) => user)
    .catch((error) => Promise.reject(error.response.data.message));
}

function loginOAuth(oauthid) {
  return axios.post('user/login/oauth', { oauthid })
    .then(handleResponse)
    .then((user) => user)
    .catch((error) => Promise.reject(error.response.data.message));
}

function getUserById(user) {
  return apiClient.get(`/user/${user}`)
    .then(handleResponse)
    .then((res) => res)
    .catch((error) => Promise.reject(error.response.data.message));
}

function createUser(user) {
  return axios.post('/user', user)
    .then(handleResponse)
    .then((data) => {
      const expiring = new Date();
      expiring.setMinutes(60 * 5 + 5);
      Cookies.set('auth', data.token, { expires: expiring }, { secure: true }, { sameSite: 'strict' });
      Cookies.set('refresh', data.refreshToken, { expires: expiring }, { secure: true }, { sameSite: 'strict' });
      return data;
    })
    .catch(() => Promise.reject(new Error('Error during account creation')));
}

function verifyEmail(email) {
  return axios.post('/user/email/', { email })
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => Promise.reject(error));
}

function getNotificationByUser(userId, companyId) {
  return apiClient.get(`/notifications/custom/${userId}/${companyId}`)
    .then(handleResponse)
    .then((data) => data)
    .catch((error) => Promise.reject(error.response.data.message));
}

function refreshAuth(email, refreshToken) {
  const body = JSON.stringify({
    email,
    refreshToken,
  });

  return axios.post('/refresh', body)
    .then(handleResponse)
    .then((auth) => {
      const expiring = new Date();
      expiring.setMinutes(60 * 5 + 5);
      Cookies.set('auth', auth.token, { expires: expiring }, { secure: true }, { sameSite: 'strict' });
      return auth;
    });
}

function logout() {
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  sessionStorage.clear();
  Cookies.remove('auth');
  Cookies.remove('refresh');
}

const userService = {
  login,
  loginOAuth,
  createUser,
  verifyEmail,
  getUserById,
  getNotificationByUser,
  refreshAuth,
  logout,
};

export default userService;
