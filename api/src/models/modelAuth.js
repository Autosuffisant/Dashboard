/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { Schema } = mongoose;

const schemaAuth = new Schema({
  app: String,
  id: String,
  token: String,
  email: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schemaAuth.plugin(mongooseDelete,
  { deletedAt: true, deletedBy: true, overrideMethods: true });


export default schemaAuth;
