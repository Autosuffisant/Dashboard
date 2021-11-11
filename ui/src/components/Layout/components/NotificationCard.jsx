import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  ListItem,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    padding: '1em',
    margin: '0.5em',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: '0.5em',
    backgroundColor: '#00BFFF',
  },
  text: {
    marginBottom: '0.5em',
  },
});

const NotificationCard = ({
  authorFirstname, authorName, message, createdAt,
}) => {
  const classes = useStyles();

  /**
   * Stringify author firstname and name and returns its initials.
   * @param {String} str1 : author's firstname
   * @param {String} str2 : author's name
   */
  const stringifyAuthor = (str1, str2) => {
    const str = `${str1} ${str2}`;
    let initials = str.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  };

  /**
   * Format date to French local date dd/MM/YY at HH:mm.
   * @param {Date} date : date to format
   */
  const getDate = (date) => {
    const localeDate = new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return localeDate;
  };

  return (
    <>
      <Card
        component={ListItem}
        className={classes.card}
      >
        <Grid container alignItems="center">
          <Grid item lg={3} sm={12} xs={12}>
            <Tooltip title={`${authorFirstname} ${authorName}`}>
              <Avatar className={classes.avatar}>
                { stringifyAuthor(authorFirstname, authorName) }
              </Avatar>
            </Tooltip>
          </Grid>
          <Grid item lg={9} sm={12} xs={12}>
            <CardContent>
              <Typography variant="body1" className={classes.text}>
                { message }
              </Typography>
              <Typography variant="body2">
                { getDate(createdAt) }
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

NotificationCard.defaultProps = {
  authorFirstname: 'Default',
  authorName: 'Default',
  message: 'Default message',
  createdAt: '0000-01-01T00:00:00.000Z',
};

NotificationCard.propTypes = {
  authorFirstname: PropTypes.string,
  authorName: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.string,
};

export default NotificationCard;
