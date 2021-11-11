/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { dashboardnode } from '../db';
import schemaAdministrator from '../models/modelAdministrator';

const jwt = require('jsonwebtoken');

const Administrator = dashboardnode.model('Administrator', schemaAdministrator);
// const Token = mongoose.model('Token', schemaToken);


/*
  CRUD method: Search all the teacher objects in the DB and send them as an array.
*/
export function getAdministrators(req, res) {
  Administrator.find({}).select('name email type lang').lean().exec((err, users) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).json(users);
    }
  });
}

/*
  CRUD method: Search a teacher object with his id in the DB and send it as an object.
*/
export function getAdministrator(req, res) {
  const decoded = jwt.decode(req.headers.authorization.split(' ')[1], { complete: true });
  if (decoded.payload.admin === false
  && !mongoose.Types.ObjectId(req.params.id).equals(mongoose.Types.ObjectId(decoded.payload.id))) {
    res.status(403).json({ error: 'You do not have the authorization to use this route' });
    return;
  }
  Administrator.findById(req.params.id)
    .select('username email themeColor')
    .lean()
    .exec((error, user) => {
      if (error) {
        res.status(404).json(error);
      }
      else if (user === null) {
        res.status(404).json({ error: 'Server was unable to find this Administrator' });
      }
      else {
        res.status(200).json(user);
      }
    });
}

/*
  CRUD method: Create a content object with valid params
  in the DB, save it and send it as an object.
*/
export function addNewAdministrator(req, res) {
  if (!req.body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if (!req.body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }
  /*  if (req.body.type <= 2) {
    return res.status(403).json(
    { error: 'You do not have the permission to create a user with a type of 2 or less ' });
  } */
  Administrator.find({ email: req.body.email }).exec((err, users) => {
    if (users.length >= 1) {
      return res.status(409).json({ error: 'This email is already used ' });
    }
    const finalUser = new Administrator(req.body);
    finalUser.admin = true;
    finalUser.username = finalUser.username;
    finalUser.setPassword(req.body.password);
    finalUser.save((errorsave) => {
      if (errorsave) {
        return res.status(400).json(errorsave);
      }
      res.status(201).json(finalUser.toAuthJSON(false));
    });
  });
}

export function emailAvailable(req, res) {
  Administrator.find({ email: req.body.email }).lean().exec((err, users) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (users.length >= 1) {
      res.status(409).json({ error: 'Email already used' });
      return;
    }
    res.status(200).json({ message: 'Email is available' });
  });
}

/*
  CRUD method: Modify a content object with valid params
  in the DB, save it and send it as an object.
*/
export function updateAdministrator(req, res) {
  Administrator.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (user === null) {
      res.status(400).json({ error: 'Server was unable to find this teacher' });
    }
    else {
      res.status(200).json({ message: 'The teacher has been successfully updated' });
    }
  });
}

/*
  CRUD method: Search a content object with his id in the DB,
  remove it and send back a confirmation.
*/
export function deleteAdministrator(req, res) {
  Administrator.delete({ _id: req.params.id }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (user === null) {
      res.status(400).json({ error: 'Server was unable to find this Administrator' });
    }
    else {
      res.status(200).json(user);
    }
  });
}

export function administratorLogin(req, res) {
  if (req.body.email === null || req.body.email === undefined) {
    return res.status(400).json({ error: 'Unable to find email in body' });
  }
  if (req.body.password === null || req.body.password === undefined) {
    return res.status(400).json({ error: 'Unable to find password in body' });
  }
  Administrator.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.status(401).json({
          message: 'Authentication failed, please check your credentials'
        });
      }
      /*
        Password checking using user method validPassword
       */
      const validPassword = users[0].validPassword(req.body.password);
      if (validPassword === false) {
        return res.status(401).json({
          message: 'Authentication failed, please check your credentials'
        });
      }
      /*
        toAuthJSONlogin method takes a rememberMe boolean as parameter and
        returns a promise including a JWT and the redirect indicator as well
        as userID upon resolution.
       */
      if (req.body.rememberMe === null
        || req.body.rememberMe === undefined || req.body.rememberMe === false) {
        users[0].toAuthJSONlogin(false)
          .then(loginRes => res.status(200).json(loginRes))
          .catch(err => res.status(404).json({ error: err.toString() }));
      }
      else {
        users[0].toAuthJSONlogin(true)
          .then(loginRes => res.status(200).json(loginRes))
          .catch(err2 => res.status(404).json({ error: err2.toString() }));
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
}

export function isSuperAdministrator(req, res) {
  res.status(200).json({ message: 'You are a super admin' });
}
