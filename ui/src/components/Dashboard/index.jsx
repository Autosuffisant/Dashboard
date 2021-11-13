/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import uiActions from '../../redux/actions/uiActions';
import WelcomeTitle from './components/WelcomeTitle';
import GridLayout from './components/GridLayout';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(4),
  },
  greeting: {
    paddingBottom: theme.spacing(4),
  },
}));

const Dashboard = ({
  changePageTitle, username,
}) => {
  const classes = useStyles();

  useEffect(() => {
    changePageTitle('Dashboard');
  }, []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12}>
        <Grid xs={12} className={classes.greeting}>
          <WelcomeTitle username={username} />
        </Grid>
        <Grid xs={12}>
          <GridLayout className={classes.content} />
        </Grid>
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  changePageTitle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

function mapState(state) {
  const { username } = state.user.userData;
  return {
    username,
  };
}

const actionCreators = {
  changePageTitle: uiActions.changePageTitle,
};

export default connect(mapState, actionCreators)(Dashboard);
