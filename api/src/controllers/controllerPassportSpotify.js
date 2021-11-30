/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import { dashboardnode } from '../db';
import schemaUser from '../models/modelUser';

const dotenv = require('dotenv');

dotenv.config();

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const User = dashboardnode.model('User', schemaUser);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.spotifyclientID,
      clientSecret: process.env.spotifyclientSecret,
      callbackURL: 'http://localhost:8080/auth/spotify/callback',
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, expiresIn, profile, done) {
      console.log(req.session.uuid);
      console.log(accessToken);
      req.session.accessToken = accessToken;
      return done(null, profile);
    }
  )
);

module.exports = passport;
