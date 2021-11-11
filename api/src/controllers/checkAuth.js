const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');

dotenv.config();


/*
  This middleware checks the type of the user in the token.
  If the type is 1 or 2 (respectively SuperAdmin and Admin), it will pass
  but it will block and send a 403 status otherwise.
 */
const verifyAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.split(' ')[0] === 'Token') {
    const decoded = jsonwebtoken.decode(authorization.split(' ')[1], { complete: true });
    if (decoded.payload.type > 2) {
      res.status(403).json({ error: 'You do not have the authorization to use this route' });
    }
    else {
      next();
    }
  }
};

const verifySuperAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.split(' ')[0] === 'Token') {
    const decoded = jsonwebtoken.decode(authorization.split(' ')[1], { complete: true });
    if (decoded.payload.superAdmin !== true) {
      res.status(403).json({ error: 'You do not have the authorization to use this route' });
    }
    else {
      next();
    }
  }
};

const getTokenFromHeaders = (req) => {
  const { authorization } = req.headers;
  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

/*
  This middleware checks the userId in params to verify that a student (type 4)
  is not allowed to get personal information of other users.
 */
/* const verifyUserID = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  if (token === null) {
    return (res.status(400).json({ error: 'Unable to find a valid token' }));
  }
  const decoded = jsonwebtoken.decode(token);
  const payloadId = mongoose.Types.ObjectId(decoded.payload.id);
  if (decoded.payload.type > 3
    && !payloadId.equals(mongoose.Types.ObjectId(req.params.id))) {
    return res.status(403).json({ error: 'You are not allowed to use this route' });
  }
  return next();
}; */

/*
Middleware used in most routes in the project.
required: User uses a JWT
optional: valid JWT or no JWT are both ok
admin: valid JWT with type 1 or 2 only
 */
const auth = {
  required: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  }),
  admin: verifyAdmin,
  superAdmin: verifySuperAdmin
};

export default auth;
