import React, { useEffect } from 'react';
import {
  Typography,
  Grid,
  Tooltip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: theme.spacing(4),
  },
  imgCard: {
    height: '20vh',
  },
}));

const Widgets = ({
  Title, HoverTitle, Image,
}) => {
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Grid item lg={2} md={4} sm={6} xs={12}>
      <Tooltip title={HoverTitle} placement="top">
        <Card>
          <CardActionArea>
            <CardMedia
              className={classes.imgCard}
              image={Image}
              title="Widget"
            />
            <CardContent>
              <Typography variant="body1">
                {Title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
    </Grid>

  );
};

Widgets.propTypes = {
  Title: PropTypes.string.isRequired,
  HoverTitle: PropTypes.string.isRequired,
  Image: PropTypes.string.isRequired,
};

export default Widgets;
