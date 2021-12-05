/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Typography,
  TextField,
  Avatar,
} from '@material-ui/core';
import { SiSpotify } from 'react-icons/si';
import { GrRefresh } from 'react-icons/gr';
import { makeStyles } from '@material-ui/core/styles';
import WidgetTemplate from '../WidgetTemplate';

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
  gridBody: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardBody: {
    height: '4em',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  widget: {
    padding: theme.spacing(2),
  },
  widgetBody: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePicture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const SpotifyMe = ({ spotifyAPI }) => {
  const classes = useStyles();
  const [myimage, setmyimage] = useState('');
  const [myname, setmyname] = useState('');
  const [followers, setmyfollowers] = useState(0);
  const [profileURL, setprofileURL] = useState('');

  const search = () => {
    try {
      spotifyAPI.getMe().then(
        (data) => {
          setmyname(data.display_name);
          setmyfollowers(data.followers.total);
          setmyimage(data.images[0].url);
          setprofileURL(data.external_urls.spotify);
        },
        (err) => {
        },
      );
    } catch (error) {
      console.log('Spotify Me error');
    }
  };

  const goToProfile = () => {
    window.open(profileURL);
  };

  window.setInterval(search, 300000);

  useEffect(() => {
    search();
  }, []);

  return (
    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Avatar style={{ position: 'absolute', top: -20, left: -20 }}>
        <SiSpotify size={30} />
      </Avatar>
      <Grid item container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Grid item xs={4}>
          <Avatar src={myimage} className={classes.profilePicture} alt="Spotify's artist profile" />
        </Grid>
        <Grid
          item
          container
          style={{
            display: 'flex', flexDirection: 'row', alignContent: 'center',
          }}
          xs={8}
        >
          <Grid item>
            <Typography>{myname}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Followers: ${followers}`}</Typography>
      </Grid>
      <Grid item style={{ marginTop: 10 }}>
        <Button onClick={goToProfile} variant="outlined">
          <Typography variant="p">
            Go to profile
          </Typography>
          <GrRefresh style={{ marginLeft: 5 }} />
        </Button>
      </Grid>
      <Grid item style={{ marginTop: 10 }}>
        <Button onClick={search} variant="outlined">
          <Typography variant="p">
            Refresh
          </Typography>
          <GrRefresh style={{ marginLeft: 5 }} />
        </Button>
      </Grid>
    </Grid>
  );
};

SpotifyMe.propTypes = {
  spotifyAPI: PropTypes.func.isRequired,
};

function mapState(state) {
  const { username, _id } = state.user.userData;
  const { darkMode } = state.ui;
  const { spotifyAPI } = state.widget;
  return {
    username, darkMode, spotifyAPI, _id,
  };
}

const actionCreators = {
};

export default connect(mapState, actionCreators)(SpotifyMe);
