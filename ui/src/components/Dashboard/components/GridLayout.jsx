/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DndContext } from '@dnd-kit/core';
import Widgets from './Widgets';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    borderRadius: 15,
    minHeight: '40vh',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  Paper: {
    height: 100,
    backgroundColor: '#fff',
  },
}));

const GridLayout = ({
  setWidgetList, removeWidget, edit, widgets, darkMode,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const Title = 'Title';
  const HoverTitle = 'Hover !';
  const widgetList = widgets;

  const getListStyle = (isDraggingOver, itemsLength) => ({
    display: 'flex',
    'flex-wrap': 'wrap',
    overflow: 'always',
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const reordered = reorder(
      widgetList,
      result.source.index,
      result.destination.index,
    );

    setWidgetList(
      reordered,
    );
  }

  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundColor: darkMode ? theme.palette.background.paper : '#fff',
        boxShadow: darkMode ? '' : '0px 5px 15px #bbb',
      }}
      spacing={4}
    >
      {
        edit ? widgetList ? (
          <Grid container>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver, widgetList.length)}
                    ref={provided.innerRef}
                  >
                    {widgetList.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Widgets
                              item={item}
                              removeSelf={removeWidget}
                              edit={edit}
                              Title={Title}
                              HoverTitle={HoverTitle}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
        ) : null : widgetList ? (
          <Grid container>
            {
              widgetList.map((item, key) => (
                <Widgets
                  key={item.id}
                  item={item}
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
  setWidgetList: PropTypes.func.isRequired,
  removeWidget: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  widgets: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default GridLayout;
