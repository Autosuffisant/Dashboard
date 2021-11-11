import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import '@fontsource/roboto';
import '@fontsource/rubik';

const Theme = ({ children, darkMode }) => {
  const theme = React.useMemo(
    () => createMuiTheme({
      overrides: {
        MuiListItem: {
          root: {
            selected: {
              borderRadius: '15px',
            },
          },
        },
      },
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: '#0011aa',
          contrastText: '#fff',
        },
        secondary: {
          main: '#ff1535',
        },
        error: {
          main: red.A400,
        },
      },
      typography: {
        fontFamily: [
          'Rubik',
          'Roboto',
        ],
      },
    }),
    [darkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

function mapState(state) {
  const { darkMode } = state.ui;
  return { darkMode };
}

export default connect(mapState, null)(Theme);
