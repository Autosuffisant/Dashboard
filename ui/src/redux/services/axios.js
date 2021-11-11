/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import config from '../../config';
import userService from './userServices';
import userConstants from '../constants/userConstants';
import store from '../store';
import authHeader from '../../helpers/authHeader';

const main = axios.create();

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

main.defaults.baseURL = config.API_URL;
main.defaults.headers.post['Content-Type'] = 'application/json';

main.interceptors.request.use(
  (config) => {
    const token = authHeader();
    if (token) {
      config.headers.Authorization = token;
    }

    const url = config.url.split('/');

    if (url[url.length - 1] === '') {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;

let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRrefreshed(token) {
  subscribers.map((cb) => cb(token));
}

main.interceptors.response.use(undefined, (err) => {
  const {
    config,
    response,
  } = err;
  const originalRequest = config;
  const state = store.getState();
  const decodedToken = jwt_decode(state.auth.authData.token);
  const userEmail = decodedToken.email;

  if (response.request.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      userService.refreshAuth(userEmail, state.auth.authData.refreshToken)
        .then((response) => {
          const auth = response;
          isRefreshing = false;
          onRrefreshed(auth.token);
          store.dispatch({
            type: userConstants.LOGIN_REFRESH_SUCCESS,
            auth,
          });
          subscribers = [];
        });
    }
    const requestSubscribers = new Promise((resolve) => {
      subscribeTokenRefresh((token) => {
        originalRequest.headers.Authorization = `Token ${token}`;
        resolve(axios(originalRequest));
      });
    });
    return requestSubscribers;
  }
  return Promise.reject(err);
});

export const apiClient = main;

export function handleResponse(response) {
  const { data } = response;
  if (!response.request.statusText === 'OK') {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
