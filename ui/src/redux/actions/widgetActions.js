/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import widgetConstants from '../constants/widgetConstants';
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
        dispatch(getWidgets(state.auth._id));
        dispatch(success(successWidgets));
      },
      (error) => {
        if (error) dispatch(failure(error.toString()));
        else dispatch(failure('Server did not respond'));
      },
    );
};

const widgetActions = {
  updateWidgets,
  getWidgets,
};

export default widgetActions;
