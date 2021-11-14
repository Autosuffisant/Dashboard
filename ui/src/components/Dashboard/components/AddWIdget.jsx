import React, { useState, Fragment } from 'react';
import {
  Grid,
  Fab,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@material-ui/core';
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
}));

const AddWidget = () => {
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
      <Fab className={classes.fab} variant="extended" color="secondary" onClick={() => {}}>
        <EditIcon className={classes.icon} />
        Modify layout
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
        aria-labelledby="widget add dialog"
      >
        <DialogContent>
          <Grid container direction="row" />
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

export default AddWidget;
