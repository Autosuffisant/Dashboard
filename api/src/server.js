/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { connectToDashboardDB } from './db';
import routeCountry from './routes/routeCountry';
import routeLanguage from './routes/routeLanguage';
import routeAuth from './routes/routeAuth';
import routeAdministrator from './routes/routeAdministrator';
import routeUser from './routes/routeUser';
import routeAbout from './routes/routeAbout';

const express = require('express');
const paginate = require('express-paginate');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
var logger = require('morgan');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const debugServer = require('debug')('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const port = 8080;

connectToDashboardDB((err) => {
  if (err) console.log(err);

  app.set('json spaces', 4);
  app.use(cors());
  app.use(session({
    secret: 'cats'
  }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser());
  if (app.get('env') === 'development') {
    app.use(logger('tiny'));
  }
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/docs', express.static('doc'));
  app.use(compression());
  app.use(helmet());
  app.use(paginate.middleware(10, 50));

  routeAbout(app);
  routeAuth(app);
  routeAdministrator(app);
  routeUser(app);
  routeCountry(app);
  routeLanguage(app);
  app.listen(port, () => {
    debugServer('listening');
  });
});

process.on('SIGINT', () => {
  mongoose.connection.close();
});

module.exports = app;
