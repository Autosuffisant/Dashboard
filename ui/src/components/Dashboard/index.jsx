/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import uiActions from '../../redux/actions/uiActions';
import widgetActions from '../../redux/actions/widgetActions';
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
  changePageTitle, username, darkMode, updateWidgets, getWidgets, widgets,
}) => {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  const addNewWidget = () => {
    const newWidgetList = [...widgets.widgets];
    const randomValues = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    newWidgetList.push({ id: `widget-${Array(10).fill(randomValues).map((x) => x[Math.floor(Math.random() * x.length)]).join('')}` });

    updateWidgets(newWidgetList);
  };

  const removeLastWidget = () => {
    const temp = [...widgets.widgets];

    temp.pop();
    updateWidgets(temp);
  };

  const removeWidget = (id) => {
    const temp = [...widgets.widgets];

    const index = temp.findIndex((element) => id === element.id);
    temp.splice(index, 1);
    updateWidgets(temp);
  };

  const switchEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    changePageTitle('Dashboard');
    getWidgets();
  }, []);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={12}>
          <Grid className={classes.greeting}>
            <WelcomeTitle username={username} />
          </Grid>
          <Grid>
            <GridLayout
              setWidgetList={updateWidgets}
              removeWidget={removeWidget}
              widgets={widgets.widgets}
              edit={edit}
              darkMode={darkMode}
              className={classes.content}
            />
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

Dashboard.defaultProps = {
  widgets: { state: 'Loading' },
};

Dashboard.propTypes = {
  changePageTitle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  updateWidgets: PropTypes.func.isRequired,
  getWidgets: PropTypes.func.isRequired,
  widgets: PropTypes.object,
};

function mapState(state) {
  const { username } = state.user.userData;
  const { darkMode } = state.ui;
  const { widgets } = state.widget;
  return {
    username, darkMode, widgets,
  };
}

const actionCreators = {
  changePageTitle: uiActions.changePageTitle,
  updateWidgets: widgetActions.updateWidgets,
  getWidgets: widgetActions.getWidgets,
};

export default connect(mapState, actionCreators)(Dashboard);
