import React, { useState, Fragment } from 'react';
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
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { SiSpotify } from 'react-icons/si';
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
  setEdit, edit, AddNewWidget, authSpotify,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <Grid item xs={4}>
                <Button className={classes.syncButton} variant="contained" onClick={authSpotify} style={{ backgroundColor: '#1DB954' }}>
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Link to Spotify
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button className={classes.syncButton} variant="contained" onClick={AddNewWidget} color="primary">
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Add
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button className={classes.syncButton} variant="contained" onClick={AddNewWidget} color="primary">
                  <SiSpotify size={30} style={{ marginRight: 10 }} />
                  <Typography variant="body1">
                    Add
                  </Typography>
                </Button>
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
  authSpotify: PropTypes.func.isRequired,
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
  authSpotify: widgetActions.authSpotify,
};

export default connect(mapState, actionCreators)(AddWidget);
