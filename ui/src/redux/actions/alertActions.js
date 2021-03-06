import alertConstants from '../constants/alertConstants';

function successWithToast(message) {
  return { type: alertConstants.SUCCESS, message };
}

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}

const alertActions = {
  success,
  successWithToast,
  error,
  clear,
};

export default alertActions;
