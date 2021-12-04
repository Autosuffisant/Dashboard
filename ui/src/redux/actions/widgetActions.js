/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import SpotifyWebApi from 'spotify-web-api-js';
import widgetConstants from '../constants/widgetConstants';
import widget from '../reducers/widgetReducer';
import widgetService from '../services/widgetServices';

const getWidgets = () => (dispatch, getState) => {
  const state = getState();
  function request(widgets) { return { type: widgetConstants.GET_WIDGET_REQUEST, widgets }; }
  function success(widgets) { return { type: widgetConstants.GET_WIDGET_SUCCESS, widgets }; }
  function failure(error) { return { type: widgetConstants.GET_WIDGET_FAILURE, error }; }

  dispatch(request());
  return widgetService.getWidgets(state.auth.authData._id)
    .then(
      (widgets) => {
        dispatch(success(widgets));
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
};

const updateWidgets = (widgets) => (dispatch, getState) => {
  const state = getState();
  function request(widgetRequest) {
    return {
      type: widgetConstants.UPDATE_WIDGET_REQUEST,
      widgetRequest,
    };
  }

  function success(widgetSuccess) {
    return {
      type: widgetConstants.UPDATE_WIDGET_SUCCESS,
      widgets: widgetSuccess,
    };
  }

  function failure(error) {
    return {
      type: widgetConstants.UPDATE_WIDGET_FAILURE,
      error,
    };
  }

  console.log(widgets);
  console.log(state.auth.authData._id);
  dispatch(request(widgets));
  return widgetService.updateWidgets(state.auth.authData._id, widgets)
    .then(
      (successWidgets) => {
        dispatch(getWidgets(state.auth.authData._id));
        dispatch(success(successWidgets));
      },
      (error) => {
        if (error) dispatch(failure(error.toString()));
        else dispatch(failure('Server did not respond'));
      },
    );
};

const initSpotifyAPI = () => (dispatch, getState) => {
  function initializeAPI(api) { return { type: widgetConstants.INIT_SPOTIFY_API, api }; }
  function request() { return { type: widgetConstants.GET_CREDENTIALS_REQUEST }; }
  function success(tokens) { return { type: widgetConstants.GET_CREDENTIALS_SUCCESS, tokens }; }
  function failure(error) { return { type: widgetConstants.GET_WIDGET_FAILURE, error }; }

  dispatch(request());
  return widgetService.getWidgetsCredentials(getState().auth.authData._id)
    .then(
      (credentialsSuccess) => {
        const spotifyAPI = new SpotifyWebApi();
        spotifyAPI.setAccessToken(credentialsSuccess.spotify.token);
        dispatch(success(credentialsSuccess));
        dispatch(initializeAPI(spotifyAPI));
      },
      (error) => {
        if (error) dispatch(failure(error.toString()));
        else dispatch(failure('Server did not respond'));
      },
    );
};

const authSpotify = () => (dispatch, getState) => {
  window.location.href = `http://localhost:8080/auth/spotify/?id=${getState().auth.authData._id}`;
};

const widgetActions = {
  updateWidgets,
  getWidgets,
  authSpotify,
  initSpotifyAPI,
};

export default widgetActions;
