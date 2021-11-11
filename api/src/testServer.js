/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import routeLanguage from './routes/routeLanguage';
import routeAuth from './routes/routeAuth';

const express = require('express');
const paginate = require('express-paginate');
const dotenv = require('dotenv');
var logger = require('morgan');

dotenv.config();

const app = express();
const cors = require('cors');
const debugServer = require('debug')('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('config');
const compression = require('compression');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyParser.json());
if (app.get('env') === 'development') {
  app.use(logger('tiny'));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/docs', express.static('doc'));
app.use(compression());
app.use(helmet());
app.use(paginate.middleware(10, 50));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectWithRetry = () => {
  console.log(`connecting to ${config.DBHost}`);
  mongoose.connect(config.DBHost, options).then(() => {
    console.log('MongoDB is connected');
  }).catch((err) => {
    console.log(`MongoDB connection unsuccessful to ${config.DBHost}, retry after 5 seconds.`);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

routeAuth(app);
routeAdministrator(app);
routeUser(app);
routeCountry(app);
routeLanguage(app);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  debugServer('listening');
});
process.on('SIGINT', () => {
  mongoose.connection.close();
});

module.exports = app;
