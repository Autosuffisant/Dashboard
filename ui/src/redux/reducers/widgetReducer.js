import widgetConstants from '../constants/widgetConstants';

const initialState = {
  widgets: [],
};

export default function widget(state = initialState, action) {
  switch (action.type) {
    case widgetConstants.GET_WIDGET_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case widgetConstants.GET_WIDGET_SUCCESS:
      return {
        ...state,
        requesting: false,
        widgets: action.widgets,
      };
    case widgetConstants.GET_WIDGET_FAILURE:
      return {
        ...state,
        requesting: false,
      };
    case widgetConstants.UPDATE_WIDGET_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case widgetConstants.UPDATE_WIDGET_SUCCESS:
      return {
        ...state,
        requesting: false,
        widgets: action.widgets,
      };
    case widgetConstants.UPDATE_WIDGET_FAILURE:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
}
