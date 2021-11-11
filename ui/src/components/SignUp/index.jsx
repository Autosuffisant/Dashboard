/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SignUpForm from './components/SignUpForm';
import userActions from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SignUp = (props) => {
  const args = props;
  const classes = useStyles();

  const handleBack = () => {
    args.setCreateAccount({ createAccount: false });
  };

  const getSignUpForm = () => (
    <SignUpForm
      handleBack={handleBack}
    />
  );

  return (
    <div className={classes.paper}>
      <div>
        {getSignUpForm()}
      </div>
    </div>
  );
};

function mapState(state) {
  const { azureToken } = state.auth;
  return { azureToken };
}

const actionCreators = {
  createUser: userActions.createUser,
};

export default connect(mapState, actionCreators)(SignUp);
