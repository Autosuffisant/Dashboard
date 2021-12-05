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
import { SiSpotify, SiGithub } from 'react-icons/si';
import { CgProfile } from 'react-icons/cg';
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

const GitHubProjectSearch = ({ githubAPI }) => {
  const classes = useStyles();
  const [searchedUser, setsearchedUser] = useState('');
  const [searchedRepo, setsearchedRepo] = useState('');
  const [userImage, setuserImage] = useState('');
  const [language, setlanguage] = useState('');
  const [issues, setissues] = useState(0);
  const [profileURL, setprofileURL] = useState(null);
  const [forksNumbers, setforksNumbers] = useState(0);

  const handleSearch = (event) => {
    setsearchedUser(event.target.value);
  };

  const handleRepo = (event) => {
    setsearchedRepo(event.target.value);
  };

  const search = () => {
    const project = githubAPI.getRepo(searchedUser, searchedRepo);
    project.getDetails().then(
      (repository) => {
        setlanguage(repository.data.language);
        setforksNumbers(repository.data.forks);
        setissues(repository.data.open_issues);
        setuserImage(repository.data.owner.avatar_url);
      },
      (error) => {
      },
    );
  };

  window.setInterval(search, 300000);

  const goToProfile = () => {
    window.open(profileURL);
  };

  useEffect(() => {
  }, []);

  return (
    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Avatar style={{ position: 'absolute', top: -20, left: -20 }}>
        <SiGithub size={30} />
      </Avatar>
      <Grid item container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Grid item xs={4}>
          <Avatar src={userImage} className={classes.profilePicture} alt="Spotify's user's   profile" />
        </Grid>
        <Grid item container xs={8}>
          <Grid item xs={12}>
            <Typography>{language}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{`Forks: ${forksNumbers}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Issues: ${issues}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField onChange={handleSearch} value={searchedUser} id="outlined-basic" label="User" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <TextField onChange={handleRepo} value={searchedRepo} id="outlined-basic" label="Repository" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <Button onClick={search} variant="outlined">
          <Typography variant="p">
            Search
          </Typography>
        </Button>
      </Grid>
      {
        profileURL && (
          <Grid item xs={6}>
            <Button onClick={goToProfile} variant="outlined">
              <Typography variant="p">
                Profile
              </Typography>
              <CgProfile style={{ marginLeft: 5 }} />
            </Button>
          </Grid>
        )
      }
    </Grid>
  );
};

GitHubProjectSearch.propTypes = {
  githubAPI: PropTypes.func.isRequired,
};

function mapState(state) {
  const { username, _id } = state.user.userData;
  const { darkMode } = state.ui;
  const { githubAPI } = state.widget;
  return {
    username, darkMode, githubAPI, _id,
  };
}

const actionCreators = {
};

export default connect(mapState, actionCreators)(GitHubProjectSearch);
