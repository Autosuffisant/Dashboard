import React, { useEffect } from 'react';
import {
  Grid, Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
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
}));

const Widgets = () => {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Grid item>
      <Paper elevation={10} className={classes.container} />
    </Grid>
  );
};

Widgets.defaultProps = {
  Title: 'Title',
  HoverTitle: 'Widget',
  Image: 'Image',
};

Widgets.propTypes = {
};

export default Widgets;
