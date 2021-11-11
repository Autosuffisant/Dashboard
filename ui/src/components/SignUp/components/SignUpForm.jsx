/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, TextField, Grid, Container, FormControl,
  InputLabel, OutlinedInput, InputAdornment, IconButton,
  FormHelperText, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import userActions from '../../../redux/actions/userActions';
import userServices from '../../../redux/services/userServices';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = ({
  handleBack, createUser, creating,
}) => {
  const classes = useStyles();
  const [errorText, setErrorText] = useState('');
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    email2: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isValidPassword = (password) => {
    // Minimum eight characters, at least one letter and one number
    const regex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
    return regex.test(password);
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    userServices.verifyEmail(e.target.value)
      .then(() => {
        setError(false);
        setErrorText('');
      })
      .catch(() => {
        setError(true);
        setErrorText('Email adress already used');
      });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    createUser({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Register</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.username}
                onChange={handleChange('username')}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.email}
                onChange={handleChange('email')}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email adress"
                name="email"
                autoComplete="email"
                error={error}
                helperText={error && errorText}
                onBlur={(e) => verifyEmail(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={values.email2 && (values.email !== values.email2)}
                value={values.email2}
                onChange={handleChange('email2')}
                variant="outlined"
                required
                fullWidth
                id="email2"
                label="Confirm email adress"
                name="email2"
                autoComplete="email"
                helperText={values.email2 && (values.email !== values.email2) && 'Emails do not match'}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  error={values.password && !isValidPassword(values.password)}
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )}
                  labelWidth={100}
                />
                {values.password && !isValidPassword(values.password) && (
                  <FormHelperText error id="password-error">
                    Please use a password with at least 8 characters and uppercase letters
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="password">Confirm password</InputLabel>
                <OutlinedInput
                  id="password2"
                  error={values.password2 && !(values.password === values.password2)}
                  type={values.showPassword2 ? 'text' : 'password'}
                  value={values.password2}
                  onChange={handleChange('password2')}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password confirmation visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )}
                  labelWidth={170}
                />
                {(values.password2 && !(values.password === values.password2)) && (
                  <FormHelperText error id="email-match-error">
                    Passwords do not match
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <Button
                onClick={() => handleBack()}
                fullWidth
                className={classes.submit}
              >
                Back
              </Button>
            </Grid>
            <Grid item md={9}>
              <Button
                onClick={(e) => handleCreateUser(e)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={
                  error
                  || !values.username
                  || !isValidPassword(values.password)
                  || !(values.password === values.password2)
                  || values.email !== values.email2
                }
                className={classes.submit}
              >
                {
                  creating ? 'Loading..' : 'Create an account'
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignUpForm.propTypes = {
  handleBack: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired,
};

function mapState(state) {
  const { creating } = state.auth;
  return { creating };
}

const actionCreators = {
  createUser: userActions.createUser,
};

export default connect(mapState, actionCreators)(SignUpForm);
