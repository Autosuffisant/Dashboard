/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaAbout = new Schema({
  client: {
    Object,
    host: String
  },
  server: {
    Object,
    current_time: Date,
    services: [{
      name: String,
      widgets: [{
        name: String,
        description: String,
        params: [{
          name: String,
          type: String
        }]
      }]
    }]
  }
});

export default schemaAbout;
