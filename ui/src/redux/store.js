import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
  userReducer,
  authenticationReducer,
  uiReducer,
  widgetReducer,
} from './reducers/index';

let middlewares;

if (process.env.NODE_ENV === 'development') {
  // middlewares = [thunk];
  // To activate redux logs
  middlewares = [thunk, logger];
} else {
  middlewares = [thunk];
}

const appReducer = combineReducers({
  user: userReducer,
  auth: authenticationReducer,
  ui: uiReducer,
  widget: widgetReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  let newState = state;
  if (action.type === 'USER_LOGGED_OUT') {
    newState = {};
  }

  return appReducer(newState, action);
};

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
