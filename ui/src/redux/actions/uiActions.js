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

const changeColor = (color) => (dispatch) => {
  dispatch({
    type: uiConstants.CHANGE_PAGE_COLOR,
    themeColor: JSON.stringify(color),
  });
  localStorage.setItem('themeColor', JSON.stringify(color));
};

const uiActions = {
  changePageTitle,
  changeDarkMode,
  changeColor,
};

export default uiActions;
