/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

const GridLayout = ({
  removeWidget, edit, widgets,
}) => {
  const classes = useStyles();
  const Title = 'Title';
  const HoverTitle = 'Hover !';

  useEffect(() => {
  }, []);

  return (
    <Grid
      container
      className={classes.container}
      spacing={5}
    >
      {
        edit ? (
          <ListManager
            items={widgets}
            direction="horizontal"
            maxItems={5}
            render={(id) => (
              <Widgets
                id={id}
                removeSelf={removeWidget}
                edit={edit}
                Title={Title}
                HoverTitle={HoverTitle}
              />
            )}
            onDragEnd={() => { }}
          />
        ) : widgets.map ? (
          <Grid container>
            {
              widgets.map((id) => (
                <Widgets
                  id={id}
                  removeSelf={removeWidget}
                  edit={edit}
                  Title={Title}
                  HoverTitle={HoverTitle}
                />
              ))
            }
          </Grid>
        ) : null
      }
    </Grid>
  );
};

GridLayout.propTypes = {
  removeWidget: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  widgets: PropTypes.array.isRequired,
};

export default GridLayout;
