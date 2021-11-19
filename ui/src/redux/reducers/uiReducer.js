import uiConstants from '../constants/uiConstants';

const currentPage = JSON.parse(sessionStorage.getItem('currentPage')) ? JSON.parse(sessionStorage.getItem('currentPage')) : 'Dashboard';
const darkMode = JSON.parse(localStorage.getItem('darkMode')) ? JSON.parse(localStorage.getItem('darkMode')) : false;
const themeColor = JSON.parse(localStorage.getItem('themeColor')) ? JSON.parse(localStorage.getItem('themeColor')) : '0011aa';

const initialState = {
  currentPage,
  darkMode,
  themeColor,
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
    case uiConstants.CHANGE_PAGE_COLOR:
      return {
        ...state,
        themeColor: action.themeColor,
      };
    default:
      return state;
  }
}
