import Cookies from 'js-cookie';
import userConstants from '../constants/userConstants';

const auth = JSON.parse(localStorage.getItem('auth'));
const authCookie = Cookies.get('auth');

let initialState = {
  loggedIn: false,
  creating: false,
  created: false,
  isTest: false,
  loggingError: false,
  azureToken: null,
};

if (auth && authCookie) {
  initialState = {
    loggedIn: true,
    isTest: auth.testFinish ? !auth.testFinish : false,
    authData: auth,
  };
} else if (!authCookie) {
  initialState = {
    loggedIn: false,
  };
} else {
  initialState = {
    loggedIn: false,
  };
}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingError: false,
        loggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        loggingError: false,
        authData: action.auth,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingError: true,
        loggedIn: false,
      };
    case userConstants.CLEAR_LOGIN:
      return {
        loggingError: false,
        loggedIn: false,
      };
    case userConstants.LOGIN_REFRESH_REQUEST:
      return {
        ...state,
        refreshingToken: true,
      };
    case userConstants.LOGIN_REFRESH_FAILURE:
      return {
        loggedIn: false,
      };
    case userConstants.LOGIN_REFRESH_SUCCESS:
      return {
        ...state,
        authData: action.auth,
      };
    case userConstants.CREATE_USER_REQUEST:
      return {
        ...state,
        creating: true,
        created: false,
      };
    case userConstants.CREATE_USER_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        loggedIn: true,
        isTest: true,
        authData: action.user,
      };
    case userConstants.CREATE_USER_FAILURE:
      return {
        ...state,
        created: false,
        creating: false,
      };
    case userConstants.SET_AZURE_TOKEN:
      return {
        ...state,
        azureToken: action.azureToken,
        created: false,
        creating: true,
      };
    default:
      return state;
  }
}
