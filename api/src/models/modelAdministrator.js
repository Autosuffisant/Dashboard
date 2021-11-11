/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

import schemaInterfaceUser from './modelInterfaceUser';
import extendSchema from '../utils/extendSchema';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongooseDelete = require('mongoose-delete');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaAdministrator = extendSchema(schemaInterfaceUser, {
  lang: { type: [Schema.Types.ObjectId], ref: 'Language' },
  superAdmin: { type: Boolean, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schemaAdministrator.plugin(mongooseDelete,
  { deletedAt: true, deletedBy: true, overrideMethods: true });
/*
  This method hashs the password and set salt and hash to decrypt it later.
*/
schemaAdministrator.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
/*
  This method encrypts the given password to check if it is equal the hash meaning
  the password is valid.
*/
schemaAdministrator.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

/*
  This method generates a JWT using the jsonwebtoken package. His expiration date
  is set to 5 hours later if the rememberMe value is false, else there is no expiration
  value.
*/
schemaAdministrator.methods.generateJWT = function (rememberMe) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setHours(today.getHours() + 5);
  if (rememberMe === false) {
    return jwt.sign({
      email: this.email,
      id: this._id,
      type: this.type,
      superAdmin: this.superAdmin,
      exp: parseInt(expirationDate.getTime(), 10)
    }, process.env.SECRET_KEY);
  }
  return jwt.sign({
    email: this.email,
    id: this._id,
    type: this.type,
    superAdmin: this.superAdmin
  }, process.env.SECRET_KEY);
};

schemaAdministrator.methods.generateRefresh = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setHours(today.getHours() + 24);
  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime(), 10)
  }, process.env.REFRESH_Key);
};

/*
  This method is used to return a token when a new user is posted alongside his
  userid and email.
*/
schemaAdministrator.methods.toAuthJSON = function (rememberMe) {
  return ({
    _id: this._id,
    email: this.email,
    token: this.generateJWT(rememberMe),
    refreshToken: this.generateRefresh()
  });
};

/*
  This method is used to return a token when a user logins. It takes a rememberMe
  boolean as parameter and returns a token (with or without expiration according to rememberMe)
  alongside his userid and email and the redirect path (if the user hasn't done his test).
*/
schemaAdministrator.methods.toAuthJSONlogin = function (rememberMe) {
  return new Promise((resolve) => {
    const redirect = {
      _id: this._id,
      isVerified: this.isVerified,
      email: this.email,
      token: this.generateJWT(rememberMe),
      refreshToken: this.generateRefresh()
    };
    resolve(redirect);
  });
};

export default schemaAdministrator;
