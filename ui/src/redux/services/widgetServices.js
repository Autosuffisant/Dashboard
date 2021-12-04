import {
  apiClient,
  handleResponse,
} from './axios';

function getWidgets(user) {
  return apiClient.get(`/user/widgets/${user}`)
    .then(handleResponse)
    .then((res) => res)
    .catch((error) => Promise.reject(error.response.data.message));
}

function updateWidgets(user, widgets) {
  return apiClient.put(`/user/widgets/${user}`, widgets)
    .then(handleResponse)
    .then((res) => res)
    .catch((error) => Promise.reject(error.response.data.message));
}

function getWidgetsCredentials(user) {
  return apiClient.get(`user/credentials/${user}`)
    .then(handleResponse)
    .then((res) => res)
    .catch((error) => Promise.reject(error.response.data.message));
}

const widgetServices = {
  getWidgets,
  updateWidgets,
  getWidgetsCredentials,
};

export default widgetServices;
