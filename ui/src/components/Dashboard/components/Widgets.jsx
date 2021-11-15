/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Fab,
  Paper,
  Tooltip,
  Typography,
  Slide,
  Dialog,
  Container,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    height: '30vh',
    width: '30vh',
    margin: theme.spacing(2),
    marginLeft: theme.spacing(8.5),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  imgCard: {
    height: '20vh',
  },
  clearButton: {
    position: 'absolute',
    margin: 0,
    top: -20,
    bottom: 'auto',
    left: 'auto',
    right: -20,
  },
  cardBody: {
    height: '4em',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
}));

const Widgets = ({
  id, removeSelf, edit, Title, HoverTitle,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <Grid item>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        transition={Slide}
        fullWidth
        maxWidth="sm"
        aria-labelledby="widget add dialog"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent>
          <Container>
            <Grid item md={12} className={classes.cardBody}>
              <Typography
                variant="h6"
                className={classes.title}
              >
                {`Are you sure you want to delete the ${Title} widget ?`}
              </Typography>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={() => removeSelf(id)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title={HoverTitle}>
        <Paper elevation={10} className={classes.container}>
          {
            edit ? <Fab onClick={() => handleClickOpen()} className={classes.clearButton} color="secondary" size="small"><ClearIcon /></Fab>
              : null
          }
          <Typography>{`Widget ${id ? id.id : ':('}`}</Typography>
        </Paper>
      </Tooltip>
    </Grid>
  );
};

Widgets.defaultProps = {
  Title: 'Title',
  HoverTitle: 'Widget',
};

Widgets.propTypes = {
  id: PropTypes.number.isRequired,
  removeSelf: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  Title: PropTypes.string,
  HoverTitle: PropTypes.string,
};

export default Widgets;
