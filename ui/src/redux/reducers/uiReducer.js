import uiConstants from '../constants/uiConstants';

const currentPage = JSON.parse(sessionStorage.getItem('currentPage')) ? JSON.parse(sessionStorage.getItem('currentPage')) : 'Dashboard';
const darkMode = JSON.parse(localStorage.getItem('darkMode')) ? JSON.parse(localStorage.getItem('darkMode')) : false;

const initialState = {
  currentPage,
  darkMode,
  currentGroup: 0,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case uiConstants.CHANGE_PAGE_TITLE:
      return {
        ...state,
        currentPage: action.title,
      };
    case uiConstants.CHANGE_DARK_MODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case uiConstants.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.group,
      };
    default:
      return state;
  }
}
