import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ListManager } from 'react-beautiful-dnd-grid';
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
  Paper: {
    height: 100,
    backgroundColor: '#fff',
  },
}));

const GridLayout = () => {
  const classes = useStyles();
  const Title = '';
  const HoverTitle = 'Hover !';
  const Image = '';

  const list = [
    { id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }, { id: '9' },
  ];

  useEffect(() => {
  }, []);

  return (
    <Grid
      container
      className={classes.container}
      spacing={5}
    >
      <ListManager
        items={list}
        direction="horizontal"
        maxItems={5}
        render={() => <Widgets Title={Title} HoverTitle={HoverTitle} Image={Image} />}
        onDragEnd={() => {}}
      />
    </Grid>
  );
};

GridLayout.propTypes = {
};

export default GridLayout;
