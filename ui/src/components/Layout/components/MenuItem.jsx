import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const MenuItem = ({
  name, route, selectedRoute, icon, handleDrawerClose,

}) => (
  <ListItem
    selected={route === selectedRoute}
    component={Link}
    to={route}
    onClick={handleDrawerClose}
    button
  >
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  selectedRoute: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,

};

export default MenuItem;
