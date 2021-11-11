/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import { List, Typography } from '@material-ui/core';
import NotificationCard from './NotificationCard';

const Notifications = ({
  anchorEl, handleMenuClose, notifications,
}) => {
  const profilMenuId = 'notifications';
  return (
    <Menu
      anchorEl={anchorEl}
      id={profilMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <List style={{ paddingRight: '15px', paddingLeft: '15px' }}>
        { notifications.length > 0 ? (
          notifications.map((notification, i) => (
            <NotificationCard
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              authorFirstname={notification.author.firstname}
              authorName={notification.author.name}
              message={notification.message}
              createdAt={notification.createdAt}
            />
          )))
          : (
            <Typography>
              Pas de notification.
            </Typography>
          )}
      </List>
    </Menu>
  );
};

Notifications.defaultProps = {
  anchorEl: null,
};

Notifications.propTypes = {
  anchorEl: PropTypes.any,
  handleMenuClose: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

function mapState(state) {
  const { currentPage } = state.ui;
  return {
    currentPage,
  };
}

export default connect(mapState, {})(Notifications);
