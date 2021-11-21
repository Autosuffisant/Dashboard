import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { InfoOutlined, SupervisorAccount } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

import MenuItem from './MenuItem';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 35,
    position: 'absolute',
    top: 0,
    marginRight: '0.5em',
    paddingTop: '1em',
  },
  drawerHeader: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    paddingLeft: '1em',
    ...theme.mixins.toolbar,
  },
  menuTitle: {
    fontSize: '1.25rem',
    fontFamily: 'Roboto',
    marginLeft: '2.5em',
    fontWeight: 500,
    lineHeight: 1.6,
  },
}));

const Menu = ({
  handleDrawerClose, selectedRoute, color,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.drawerContainer}>
      <div style={{ backgroundColor: color }} className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Grid container>
          <Grid item md={12}>
            <img src="/favicon.ico" className={classes.logo} alt="dashboard logo" />
            <Typography variant="h6" className={classes.menuTitle}>
              <span>Dashboard</span>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <List>
        <MenuItem
          name="Dashboard"
          route="/dashboard"
          selectedRoute={selectedRoute}
          icon={<DashboardIcon />}
          handleDrawerClose={handleDrawerClose}
        />
        <MenuItem
          name="About.json"
          route="/about.json"
          selectedRoute={selectedRoute}
          icon={<InfoOutlined />}
          handleDrawerClose={handleDrawerClose}
        />
        <MenuItem
          name="Credits"
          route="/Credits"
          selectedRoute={selectedRoute}
          icon={<SupervisorAccount />}
          handleDrawerClose={handleDrawerClose}
        />
      </List>
    </div>
  );
};

Menu.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  selectedRoute: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Menu;
