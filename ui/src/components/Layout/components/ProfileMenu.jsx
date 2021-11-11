/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import userActions from '../../../redux/actions/userActions';
import uiActions from '../../../redux/actions/uiActions';

const ProfileMenu = ({
  anchorEl, logout, changeDarkMode, handleMenuClose,
}) => {
  const profilMenuId = 'account-menu';
  return (
    <Menu
      anchorEl={anchorEl}
      id={profilMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {/* <MenuItem>Mon profil</MenuItem> */}
      <MenuItem onClick={() => logout()}>Se deconnecter</MenuItem>
      <Divider />
      <FormControlLabel
        value="start"
        style={{ paddingRight: '10px' }}
        control={<Switch onClick={changeDarkMode} color="primary" />}
        label="Mode sombre"
        labelPlacement="start"
      />
    </Menu>
  );
};

ProfileMenu.defaultProps = {
  anchorEl: null,
};

ProfileMenu.propTypes = {
  anchorEl: PropTypes.any,
  logout: PropTypes.func.isRequired,
  changeDarkMode: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
};

function mapState(state) {
  const { currentPage } = state.ui;
  return {
    currentPage,
  };
}

const actionCreator = {
  logout: userActions.logout,
  changeDarkMode: uiActions.changeDarkMode,
};

export default connect(mapState, actionCreator)(ProfileMenu);
