import uiConstants from '../constants/uiConstants';

const changePageTitle = (title) => ({
  type: uiConstants.CHANGE_PAGE_TITLE,
  title,
});

const changeDarkMode = () => (dispatch, getState) => {
  const state = getState();
  localStorage.setItem('darkMode', !state.ui.darkMode);
  dispatch({
    type: uiConstants.CHANGE_DARK_MODE,
    darkMode: !state.ui.darkMode,
  });
};

const changeColor = () => (dispatch, color) => {
  dispatch({
    type: uiConstants.CHANGE_PAGE_COLOR,
    themeColor: color,
  });
};

const uiActions = {
  changePageTitle,
  changeDarkMode,
  changeColor,
};

export default uiActions;
