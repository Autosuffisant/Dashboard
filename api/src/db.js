/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

const config = require('config');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let dashboardDB;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectToDashboardDB = (callback) => {
  MongoClient.connect(config.DBHost, options, (err, client) => {
    dashboardDB = client.db('locker');
    return callback(err);
  });
};

const getDashboardDB = () => dashboardDB;

exports.dashboardnode = mongoose.createConnection(config.DBHost, options);
exports.connectToDashboardDB = connectToDashboardDB;
exports.getDashboardDB = getDashboardDB;
