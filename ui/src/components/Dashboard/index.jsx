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
import userActions from '../../redux/actions/userActions';

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
  _id, changePageTitle, username, darkMode, updateWidgets, getWidgets, getUser, widgets,
}) => {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  const addNewWidget = (type) => {
    const newWidgetList = widgets.widgets ? [...widgets.widgets] : [];
    const randomValues = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    // Is widget already displayed
    if (newWidgetList.find((widget) => widget.type === type)) return;

    newWidgetList.push({ type, id: `widget-${Array(10).fill(randomValues).map((x) => x[Math.floor(Math.random() * x.length)]).join('')}` });

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
    getUser(_id);
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

Dashboard.propTypes = {
  _id: PropTypes.string.isRequired,
  changePageTitle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  updateWidgets: PropTypes.func.isRequired,
  getWidgets: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  widgets: PropTypes.object.isRequired,
};

function mapState(state) {
  const { username, _id } = state.user.userData;
  const { darkMode } = state.ui;
  const { widgets } = state.widget;
  return {
    username, darkMode, widgets, _id,
  };
}

const actionCreators = {
  changePageTitle: uiActions.changePageTitle,
  updateWidgets: widgetActions.updateWidgets,
  getWidgets: widgetActions.getWidgets,
  getUser: userActions.getUser,
};

export default connect(mapState, actionCreators)(Dashboard);
