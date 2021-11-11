import {
  apiClient,
  handleResponse,
} from './axios';

function getCode(code) {
  return apiClient.get(`/code/name/${code}`)
    .then(handleResponse)
    .catch((error) => Promise.reject(error));
}

const signUpServices = {
  getCode,
};

export default signUpServices;
