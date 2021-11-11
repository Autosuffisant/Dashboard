/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import uiActions from '../../redux/actions/uiActions';
import WelcomeTitle from './components/WelcomeTitle';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
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
    <Container maxWidth="lg" className={classes.container}>
      <Grid container style={{ justifyContent: 'space-between' }} spacing={3}>
        <Grid item xs={12} md={12}>
          <WelcomeTitle username={username} />
        </Grid>
      </Grid>
    </Container>
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
