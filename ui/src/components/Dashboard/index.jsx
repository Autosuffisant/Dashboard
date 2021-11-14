/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import uiActions from '../../redux/actions/uiActions';
import WelcomeTitle from './components/WelcomeTitle';
import GridLayout from './components/GridLayout';
import AddWidget from './components/AddWIdget';

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
  fab: {
    margin: 0,
    top: 'auto',
    bottom: 30,
    left: 10,
    right: 'auto',
    position: 'fixed',
    zIndex: '10',
  },
}));

const Dashboard = ({
  changePageTitle, username,
}) => {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [widgetList, setWidgetList] = useState([{ id: 0 }]);
  const [widgetNumber, setWidgetNumber] = useState(1);

  const addNewWidget = () => {
    const newWidget = { id: widgetNumber };

    setWidgetNumber(widgetNumber + 1);
    setWidgetList([...widgetList, newWidget]);
  };

  const removeLastWidget = () => {
    if (widgetNumber > 0) {
      const temp = [...widgetList];

      temp.splice(temp.length - 1, 1);
      setWidgetList(temp);
      setWidgetNumber(widgetNumber - 1);
    }
  };

  const switchEdit = () => {
    setEdit(!edit);
  };
  useEffect(() => {
    changePageTitle('Dashboard');
  }, []);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={12}>
          <Grid xs={12} className={classes.greeting}>
            <WelcomeTitle username={username} />
          </Grid>
          <Grid xs={12}>
            <GridLayout widgets={widgetList} edit={edit} className={classes.content} />
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.fab}>
        <AddWidget
          RemoveLastWidget={removeLastWidget}
          AddNewWidget={addNewWidget}
          setEdit={switchEdit}
          edit={edit}
        />
      </div>
    </>
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
