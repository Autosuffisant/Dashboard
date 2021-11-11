import userConstants from '../constants/userConstants';

const userData = JSON.parse(localStorage.getItem('user'));

const initialState = {
  checkingToken: false,
  requestNewPassword: false,
  newPassword: false,
  userData: userData && userData,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        userData: action.user,
      };
    case userConstants.GET_USER_FAILURE:
      return {
        ...state,
        requesting: false,
      };
    case userConstants.REQUEST_NEW_PASSWORD:
      return {
        requestNewPassword: true,
      };
    case userConstants.SUCCESS_NEW_PASSWORD:
      return {
        newPassword: true,
      };
    case userConstants.FAILURE_NEW_PASSWORD:
      return {};
    case userConstants.UNLOAD_USER:
      return {};
    default:
      return state;
  }
}
