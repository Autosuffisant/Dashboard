/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Button, Grid, Box, Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useMsal } from '@azure/msal-react';
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { loginRequest, graphConfig } from '../../azure/authConfig';
import LoginForm from './components/LoginForm';
import Copyright from './components/Copyright';
import SignUp from '../SignUp';
import userServices from '../../redux/services/userServices';

const qs = require('qs');

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

async function callMsGraph(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);
  headers.append('Access-Control-Allow-Origin', '*');

  const options = {
    method: 'GET',
    headers,
  };
  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json());
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  mainCard: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
      minWidth: '100vw',
      margin: '0',
      paddin: '0',
      position: 'relative',
      overflow: 'visible',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0',
      margin: '0',
      minHeight: '100vh',
    },
    [`${theme.breakpoints.up('md')} and (orientation: portrait)`]: {
      padding: '20vh 2vw',
      margin: '0',
    },
    minHeight: '70vh',
    minWidth: '45vw',
    margin: '0 20vh',
    padding: '6vw 0',
    position: 'relative',
    overflow: 'visible',
  },
  image: {
    backgroundImage: `url(login_${Math.floor((Math.random() * 4) + 1)}.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px 0px 0px 20px',
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({
  location, setAzureToken, login,
}) => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [azureSignup, setAzureSignup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    forgotPassword: false,
    createAccount: false,
    params: {
      token: null,
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const connectAzure = (tokenAzure, code, sem) => {
    setAzureToken(tokenAzure);
    callMsGraph(tokenAzure).then((_response) => {
      const tmpResponse = { ..._response, code: code != null ? code : '', sem: sem != null ? sem : '' };
      setGraphData(tmpResponse);
      userServices.verifyEmail(_response.userPrincipalName)
        .then(() => {
          setAzureSignup(true);
        })
        .catch(() => {
          login(_response.userPrincipalName, _response.id, true)
            .then((response) => {
              if (response === undefined) {
                setOpen(true);
              } else {
                setAzureSignup(false);
                setGraphData(null);
              }
            });
        });
    });
  };

  const RequestAccessToken = (code, sem) => {
    const accountsTest = instance.getAllAccounts();
    const request = {
      ...loginRequest,
      account: accountsTest[0],
    };
    instance.acquireTokenSilent(request)
      .then((response) => {
        connectAzure(response.accessToken, code, sem);
      }).catch(() => {
        instance.acquireTokenRedirect(request)
          .then((response) => {
            connectAzure(response.accessToken, code, sem);
          }).catch(() => {
            setAzureSignup(false);
            setGraphData(null);
          });
      });
  };

  const handleLogin = (code, sem) => {
    instance.loginRedirect(loginRequest).then(() => {
      RequestAccessToken(code, sem);
    }).catch(() => {
      setAzureSignup(false);
      setGraphData(null);
    });
  };

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    setValues({ ...values, params });
    /*
    const code = params.code !== undefined && params.code !== null ? atob(params.code) : '';
    const sem = params.sem !== undefined && params.sem !== null ? parseInt(params.sem, 10) : null;
    let accountsTest = instance.getAllAccounts();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10 && accountsTest.length === 0; i++) {
      accountsTest = instance.getAllAccounts();
    }
    if (accountsTest.length > 0) {
      RequestAccessToken(code, sem);
    } else if (params.code || params.sem) {
      handleLogin(code, sem);
    }
    */
  }, [location, accounts]);

  const classes = useStyles();
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Portail Azure: Connexion impossible.
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <Grid container direction="row" className={classes.mainCard}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              {!values.createAccount && (<img src="/img/logo.png" width="200" height="200" alt="Dashboard Logo" />)}
              <div className={classes.paper}>
                {
                  (values.createAccount || azureSignup
                    ? (
                      <SignUp
                        graphData={graphData}
                        setCreateAccount={() => setValues({ ...values, createAccount: false })}
                      />
                    )
                    : (
                      <LoginForm
                        setCreateAccount={() => setValues({ ...values, createAccount: true })}
                      />
                    )
                  )
                }
              </div>
              <Grid container style={{ marginTop: '1em' }}>
                <Grid item xs>
                  {!values.forgotPassword ? (
                    <>
                      <Grid container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        { !azureSignup || !values.createAccount ? (
                          <Button
                            onClick={() => handleLogin(null, null)}
                            style={{ marginTop: '30px' }}
                          >
                            <img src="img/microsoft_long.svg" title="Connection to MS Azure" alt="azure" />
                          </Button>
                        )
                          : null}
                      </Grid>
                    </>
                  ) : (
                    <Button
                      onClick={() => setValues({ ...values, forgotPassword: false })}
                      color="primary"
                    >
                      Back
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Box mt={3}>
                <Copyright />
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Login.propTypes = {
  location: PropTypes.object.isRequired,
  setAzureToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

function mapState(state) {
  const { azureToken } = state.auth;
  return { azureToken };
}

const actionCreators = {
  setAzureToken: userActions.setAzureToken,
  login: userActions.login,
  clearLogin: userActions.clearLogin,
};

export default connect(mapState, actionCreators)(Login);
