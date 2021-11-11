/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import mongoose from 'mongoose';
import fs from 'fs';
import { dashboardnode } from '../db';
import schemaAdministrator from '../models/modelAdministrator';
import schemaUser from '../models/modelUser';
import schemaToken from '../models/modelToken';

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');

const Administrator = dashboardnode.model('Administrator', schemaAdministrator);
const User = dashboardnode.model('User', schemaUser);
const Token = dashboardnode.model('Token', schemaToken);


export function refreshLogin(req, res) {
  if (req.body.refreshToken === undefined || req.body.refreshToken === null) {
    return res.status(400).json({ error: 'Invalid parameters: unable to find a refreshToken in the body' });
  }
  if (req.body.email === undefined || req.body.email === null) {
    return res.status(400).json({ error: 'Invalid parameters: unable to find a email in the body' });
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(400).json(err);
    }
    else if (user === null) {
      res.status(404).json({ error: 'Unable to find an user with this email' });
    }
    else {
      const decoded = jwt.decode(req.body.refreshToken, { complete: true });
      const payloadId = mongoose.Types.ObjectId(decoded.payload.id);
      if (payloadId.equals(mongoose.Types.ObjectId(user._id))) {
        if (new Date(decoded.payload.exp) > new Date()) {
          user.toAuthJSONlogin(false)
            .then(loginRes => res.status(200).json(loginRes))
            .catch(err2 => res.status(401).json({ error: err2.toString() }));
        }
        else {
          res.status(401).json({ error: 'The refresh token is expired' });
        }
      }
      else {
        return res.status(401).json({ error: 'Email and refresh token user does not match' });
      }
    }
  });
}

/*
Short middleware to verify if a user is authenticated (if JWT exists)
*/
export function isAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({
    error: 'User not authenticated'
  });
}
