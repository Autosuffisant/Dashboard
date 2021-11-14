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
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useTheme, makeStyles } from '@material-ui/core/styles';

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
}));

const AddWidget = ({
  setEdit, edit, AddNewWidget, RemoveLastWidget,
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
      <Fab className={classes.fab} variant="extended" color="secondary" onClick={setEdit}>
        <EditIcon className={classes.icon} />
        {edit ? 'Save layout' : 'Edit layout'}
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
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <Button variant="contained" onClick={AddNewWidget} color="secondary">
                  Add widget
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={RemoveLastWidget} color="secondary">
                  Remove last widget
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
  RemoveLastWidget: PropTypes.func.isRequired,
};

export default AddWidget;
