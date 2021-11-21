/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PaletteIcon from '@material-ui/icons/Palette';
import { connect } from 'react-redux';
import { TwitterPicker } from 'react-color';
import uiActions from '../../redux/actions/uiActions';
import Links from './components/Menu';
import userActions from '../../redux/actions/userActions';
import ProfileMenu from './components/ProfileMenu';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    width: 45,
    marginRight: '1em',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Layout = ({
  changeColor, themeColor, currentPage, location, children,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorMenu, setColorMenu] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [currentThemeColor, setcurrentThemeColor] = useState(themeColor);

  useEffect(() => {
  }, []);

  const handleColor = (color) => {
    setcurrentThemeColor(color.hex);
    changeColor(color.hex);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickcolor = (event) => {
    setColorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setColorMenu(null);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = useState(false);

  const mobileProfilMenuId = 'account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileProfilMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: currentThemeColor }}
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <img src="/favicon.ico" className={classes.logo} alt="Dashboard logo" to="/dashboard" />
          <Typography variant="h6">
            {currentPage}
          </Typography>
          <div className={classes.grow} />
          <IconButton
            aria-label="more"
            aria-controls="menu-color"
            aria-haspopup="true"
            onClick={handleClickcolor}
          >
            <PaletteIcon style={{ fill: '#fff' }} />
          </IconButton>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={mobileProfilMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileProfilMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Menu
        id="menu-color"
        anchorEl={colorMenu}
        keepMounted
        open={Boolean(colorMenu)}
        onClose={handleClose}
      >
        <TwitterPicker
          color={currentThemeColor}
          onChangeComplete={handleColor}
        />
      </Menu>
      <ProfileMenu handleMenuClose={handleProfileMenuClose} anchorEl={anchorEl} />
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerOpen,
        }}
        variant="temporary"
        anchor="left"
        open={open}
      >
        <Links
          color={currentThemeColor}
          selectedRoute={location.pathname}
          handleDrawerClose={() => setOpen(false)}
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  currentPage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  themeColor: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
};

function mapState(state) {
  const { themeColor, currentPage } = state.ui;
  const { userId } = state.auth.authData._id;
  return {
    themeColor, userId, currentPage,
  };
}

const actionCreator = {
  logout: userActions.logout,
  changeDarkMode: uiActions.changeDarkMode,
  changeColor: uiActions.changeColor,
};

export default withRouter(connect(mapState, actionCreator)(Layout));
