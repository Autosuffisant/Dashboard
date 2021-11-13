import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import Widgets from './Widgets';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 15,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const GridLayout = () => {
  const classes = useStyles();
  const Image = '';
  const Title = 'Title';
  const HoverTitle = 'Hover !';

  useEffect(() => {
  }, []);

  return (
    <Grid
      container
      spacing={5}
      className={classes.container}
    >
      <Widgets Title={Title} Image={Image} HoverTitle={HoverTitle} />
    </Grid>
  );
};

GridLayout.propTypes = {
};

export default GridLayout;
