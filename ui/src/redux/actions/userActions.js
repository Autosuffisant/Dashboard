/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import Cookies from 'js-cookie';
import userConstants from '../constants/userConstants';
import userService from '../services/userServices';
import alertActions from './alertActions';

function getUser(userId) {
  function request(user) { return { type: userConstants.GET_USER_REQUEST, user }; }
  function success(user) { return { type: userConstants.GET_USER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.GET_USER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(userId));
    return userService.getUserById(userId)
      .then(
        (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function createUser(user) {
  function request(userRequest) {
    return {
      type: userConstants.CREATE_USER_REQUEST,
      userRequest,
    };
  }

  function success(userSuccess) {
    return {
      type: userConstants.CREATE_USER_SUCCESS,
      user: userSuccess,
    };
  }

  function failure(error) {
    return {
      type: userConstants.CREATE_USER_FAILURE,
      error,
    };
  }

  return (dispatch) => {
    const newUser = {
      email: user.email,
      password: user.password,
      username: user.username,
      admin: user.admin,
    };
    dispatch(request(newUser));
    return userService.createUser(newUser)
      .then(
        async (auth) => {
          localStorage.setItem('auth', JSON.stringify(auth));
          await dispatch(getUser(auth._id));
          dispatch(success(auth));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function login(email, password, remember) {
  function loginRequest() { return { type: userConstants.LOGIN_REQUEST }; }
  function loginSuccess(auth) { return { type: userConstants.LOGIN_SUCCESS, auth }; }
  function loginFailure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(loginRequest({ email }));
    return userService.login(email, password)
      .then(
        async (auth) => {
          localStorage.setItem('auth', JSON.stringify(auth));
          const expiring = new Date();
          expiring.setMinutes(60 * 5 + 5);
          Cookies.set('auth', auth.token, { expires: remember ? null : expiring }, { secure: true }, { sameSite: 'strict' });
          Cookies.set('refresh', auth.refreshToken, { expires: 365 }, { secure: true }, { sameSite: 'strict' });
          await dispatch(getUser(auth._id));
          dispatch(loginSuccess(auth));
        },
        (error) => {
          dispatch(loginFailure(error.toString()));
          dispatch(alertActions.error(new Error('Connection failed, please check your credentials')));
        },
      )
      .catch((error) => {
        console.error(error);
      });
  };
}

function loginOAuth(OAuthID, remember) {
  function loginOAuthRequest(oauth) { return { type: userConstants.LOGIN_OAUTH_REQUEST, oauth }; }
  function loginSuccess(auth) { return { type: userConstants.LOGIN_SUCCESS, auth }; }
  function loginFailure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(loginOAuthRequest(OAuthID));
    return userService.loginOAuth(OAuthID)
      .then(
        async (auth) => {
          localStorage.setItem('auth', JSON.stringify(auth));
          const expiring = new Date();
          expiring.setMinutes(60 * 5 + 5);
          Cookies.set('auth', auth.token, { expires: remember ? null : expiring }, { secure: true }, { sameSite: 'strict' });
          Cookies.set('refresh', auth.refreshToken, { expires: 365 }, { secure: true }, { sameSite: 'strict' });
          await dispatch(getUser(auth._id));
          dispatch(loginSuccess(auth));
        },
        (error) => {
          dispatch(loginFailure(error.toString()));
          dispatch(alertActions.error(new Error('Connection failed, please check your credentials')));
        },
      )
      .catch((error) => {
        console.error(error);
      });
  };
}

function setAzureToken(token) {
  return (dispatch) => {
    dispatch({
      type: userConstants.SET_AZURE_TOKEN,
      azureToken: token,
    });
  };
}

const authGoogle = () => () => {
  window.location.href = 'http://localhost:8080/auth/google';
};

function clearLogin() {
  return (dispatch) => {
    dispatch({
      type: userConstants.CLEAR_LOGIN,
    });
  };
}

function logout() {
  return (dispatch) => {
    userService.logout();
    dispatch({ type: 'USER_LOGGED_OUT' });
    document.location.reload();
  };
}

const userActions = {
  login,
  loginOAuth,
  createUser,
  getUser,
  logout,
  setAzureToken,
  clearLogin,
  authGoogle,
};

export default userActions;
