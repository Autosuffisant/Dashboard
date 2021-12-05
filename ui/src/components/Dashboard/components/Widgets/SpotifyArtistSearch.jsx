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

const SpotifyArtistSearch = ({ spotifyAPI }) => {
  const classes = useStyles();
  const [searchedArtist, setsearchedArtist] = useState('');
  const [artistImage, setartistImage] = useState('');
  const [artistName, setartistName] = useState('');
  const [artistGenre, setartistGenre] = useState('');
  const [listeners, setlisteners] = useState(0);

  const handleSearch = (event) => {
    setsearchedArtist(event.target.value);
  };

  const search = () => {
    spotifyAPI.searchArtists(searchedArtist).then(
      (data) => {
        if (!data.artists.items.length) return;
        setartistImage(data.artists.items[0].images[0].url);
        setartistName(data.artists.items[0].name);
        setlisteners(data.artists.items[0].followers.total);
        setartistGenre(data.artists.items[0].genres[0]);
      },
      (err) => {
        console.error('Spotify Artist search error');
      },
    );
  };

  window.setInterval(search, 300000);

  useEffect(() => {
  }, []);

  return (
    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Avatar style={{ position: 'absolute', top: -20, left: -20 }}>
        <SiSpotify size={30} />
      </Avatar>
      <Grid item container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Grid item xs={4}>
          <Avatar src={artistImage} className={classes.profilePicture} alt="Spotify's artist profile" />
        </Grid>
        <Grid item container xs={8}>
          <Grid item xs={12}>
            <Typography>{artistName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{artistGenre}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Listeners: ${listeners}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField onChange={handleSearch} value={searchedArtist} id="outlined-basic" label="Search..." variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={search} variant="outlined">
          <Typography variant="p">
            Search
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

SpotifyArtistSearch.propTypes = {
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

export default connect(mapState, actionCreators)(SpotifyArtistSearch);
