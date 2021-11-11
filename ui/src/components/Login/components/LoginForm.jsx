import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AlternateEmail, VpnKeyRounded, Visibility, VisibilityOff,
} from '@material-ui/icons';
import userActions from '../../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  newAccountButton: {
    marginTop: theme.spacing(4),
  },
}));

const LoginForm = ({
  login, setCreateAccount, loggingIn, loggingError,
}) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email adress"
        name="email"
        autoComplete="email"
        value={email || ''}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmail />
            </InputAdornment>
          ),
        }}
        autoFocus
      />
      <FormControl
        variant="outlined"
        fullWidth
        style={{ marginBottom: '1em' }}
      >
        <InputLabel htmlFor="password">Password *</InputLabel>
        <OutlinedInput
          id="password"
          error={loggingError}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startAdornment={(
            <InputAdornment position="start">
              <VpnKeyRounded />
            </InputAdornment>
          )}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
          labelWidth={105}
        />
        {loggingError && (
          <FormHelperText error id="password-error">
            Incorrect Email or password
          </FormHelperText>
        )}
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={(e) => handleClick(e)}
      >
        {loggingIn ? 'Loading...' : 'Login'}
      </Button>
      <Button
        className={classes.newAccountButton}
        fullWidth
        onClick={() => setCreateAccount()}
        variant="contained"
      >
        Create an account
      </Button>
    </form>
  );
};

LoginForm.defaultProps = {
  loggingIn: false,
  loggingError: false,
};

LoginForm.propTypes = {
  loggingIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
  loggingError: PropTypes.bool,
  setCreateAccount: PropTypes.func.isRequired,
};

function mapState(state) {
  const { loggingIn, loggingError } = state.auth;
  return { loggingIn, loggingError };
}

const actionCreators = {
  login: userActions.login,
};

export default connect(mapState, actionCreators)(LoginForm);
