import {
  apiClient,
  handleResponse,
} from './axios';

function changeColor(userId, color) {
  return apiClient.put(`/users/color/${userId}`, color)
    .then(handleResponse)
    .catch((error) => Promise.reject(error));
}

const uiServices = {
  changeColor,
};

export default uiServices;
