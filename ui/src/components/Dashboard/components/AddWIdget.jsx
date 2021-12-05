import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Fab,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
  Slide,
  Container,
  Typography,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { SiSpotify, SiGithub } from 'react-icons/si';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
// import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import widgetActions from '../../../redux/actions/widgetActions';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  fab: {
    marginLeft: theme.spacing(3),
    padding: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '40vh',
  },
  syncButton: {
    minWidth: '200px',
    padding: theme.spacing(1.5),
  },
}));

const AddWidget = ({
  setEdit,
  edit,
  AddNewWidget,
  isSpotifyInit,
  isGithubInit,
  initSpotifyAPI,
  initGithubAPI,
  githubToken,
  spotifyToken,
  authSpotify,
  authGithub,
}) => {
  const [open, setOpen] = useState(false);
  const [refreshInterval, setrefreshInterval] = useState(300);
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInterval = (event) => {
    setrefreshInterval(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (spotifyToken && !isSpotifyInit) initSpotifyAPI();
    if (githubToken && !isGithubInit) initGithubAPI();
  }, []);

  return (
    <>
      <Fab className={classes.fab} variant="extended" color="primary" onClick={handleClickOpen}>
        <AddIcon className={classes.icon} />
        Add a Widget
      </Fab>
      <Fab
        className={classes.fab}
        variant="extended"
        style={{
          backgroundColor: edit ? '#55a630' : '#dddd00',
        }}
        onClick={setEdit}
      >
        {
          edit ? <CheckIcon className={classes.icon} />
            : <EditIcon className={classes.icon} />
        }
        {
          edit ? 'Save layout' : 'Edit layout'
        }
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        transition={Slide}
        fullWidth
        maxWidth="lg"
        aria-labelledby="widget add dialog"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent>
          <Container>
            <Grid container display="flex" justifyContent="space-around" spacing={4}>
              <Grid item xs={3}>
                <Button className={classes.syncButton} variant="contained" onClick={authSpotify} style={{ backgroundColor: '#1DB954' }}>
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Link to Spotify
                  </Typography>
                  {
                    spotifyToken && (
                      <Grid>
                        <RiCheckboxBlankCircleFill color="#0a0" size={26} style={{ position: 'absolute', right: -13, top: -13 }} />
                        <BsCheck color="#fff" size={20} style={{ position: 'absolute', right: -10, top: -10 }} />
                      </Grid>
                    )
                  }
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button disabled={spotifyToken && false} className={classes.syncButton} variant="contained" onClick={() => AddNewWidget('Spotify Artist Search')} style={{ backgroundColor: '#1DB954' }}>
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Artist search widget
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button disabled={spotifyToken && false} className={classes.syncButton} variant="contained" onClick={() => AddNewWidget('Spotify Track Search')} style={{ backgroundColor: '#1DB954' }}>
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Track search widget
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button disabled={spotifyToken && false} className={classes.syncButton} variant="contained" onClick={() => AddNewWidget('Spotify Me')} style={{ backgroundColor: '#1DB954' }}>
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    My profile
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button className={classes.syncButton} variant="contained" onClick={authGithub} style={{ backgroundColor: '#eee' }}>
                  <SiGithub size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Link to Github
                  </Typography>
                  {
                    githubToken && (
                      <Grid>
                        <RiCheckboxBlankCircleFill color="#0a0" size={26} style={{ position: 'absolute', right: -13, top: -13 }} />
                        <BsCheck color="#fff" size={20} style={{ position: 'absolute', right: -10, top: -10 }} />
                      </Grid>
                    )
                  }
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button disabled={spotifyToken && false} className={classes.syncButton} variant="contained" onClick={() => AddNewWidget('Github User Search')} style={{ backgroundColor: '#eee' }}>
                  <SiGithub size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    User search widget
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button disabled={spotifyToken && false} className={classes.syncButton} variant="contained" onClick={() => AddNewWidget('Github Project Search')} style={{ backgroundColor: '#eee' }}>
                  <SiGithub size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Project search
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={handleInterval} value={refreshInterval} id="outlined-basic" label="Interval" variant="outlined" />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddWidget.propTypes = {
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  AddNewWidget: PropTypes.func.isRequired,
  isSpotifyInit: PropTypes.bool.isRequired,
  isGithubInit: PropTypes.bool.isRequired,
  initSpotifyAPI: PropTypes.func.isRequired,
  initGithubAPI: PropTypes.func.isRequired,
  githubToken: PropTypes.string.isRequired,
  spotifyToken: PropTypes.string.isRequired,
  authSpotify: PropTypes.func.isRequired,
  authGithub: PropTypes.func.isRequired,
};

function mapState(state) {
  const { username, github, spotify } = state.user.userData;
  const { darkMode } = state.ui;
  const { widgets, isSpotifyInit, isGithubInit } = state.widget;
  const githubToken = github.token;
  const spotifyToken = spotify.token;
  return {
    username, darkMode, widgets, isSpotifyInit, isGithubInit, githubToken, spotifyToken,
  };
}

const actionCreators = {
  authSpotify: widgetActions.authSpotify,
  authGithub: widgetActions.authGithub,
  initSpotifyAPI: widgetActions.initSpotifyAPI,
  initGithubAPI: widgetActions.initGithubAPI,
};

export default connect(mapState, actionCreators)(AddWidget);
