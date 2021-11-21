/* eslint-disable no-underscore-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import schemaUser from '../models/modelUser';
import { dashboardnode } from '../db';

const User = dashboardnode.model('User', schemaUser);
// const Token = dashboardnode.model('Token',schemaToken);

/*
  CRUD method: Search all the user objects in the DB and send them as an array.
*/
export function getUsers(req, res) {
  User.find({})
    .select('firstname name email phone type')
    .sort({ firstname: 'asc' })
    .lean()
    .exec((err, users) => {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(200).json(users);
      }
    });
}

/*
  CRUD method: Search a user object with his id in the DB and send it as an object.
*/
export function getUser(req, res) {
  User.findById(req.params.id)
    .select('username email admin isVerified')
    .lean()
    .exec((error, user) => {
      if (error) {
        res.status(404).json(error);
      }
      else if (user === null) {
        res.status(404).json({ error: 'Server was unable to find this User' });
      }
      else {
        res.status(200).json(user);
      }
    });
}


export function userSearch(req, res) {
  const search = req.query.search || '';
  User
    .find({
      $or: [
        { firstname: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    })
    .select('firstname name email phone')
    .exec((err, users) => {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.status(200).json(users);
      }
    });
}


export function userListSearch(req, res) {
  const sortField = req.params.s || 'name';
  const sortCriteria = req.params.sc || 'asc';
  const perPage = Number(req.query.perpage) || 10;
  const page = req.query.page || 1;
  const search = req.query.search || '';

  User.find({
    $or: [
      { firstname: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } }
    ]
  })
    .lean()
    .exec((error, totalCount) => {
      if (error) {
        res.status(400).send(error);
      }
      else {
        User
          .find({
            $or: [
              { firstname: { $regex: search, $options: 'i' } },
              { name: { $regex: search, $options: 'i' } }
            ]
          })
          .select('firstname name email phone')
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .sort({ [sortField]: sortCriteria })
          .exec((err, users) => {
            if (err) {
              res.status(400).send(err);
            }
            else {
              res.status(200).json({
                tests: users,
                current: page,
                totalCount: totalCount.length
              });
            }
          });
      }
    });
}


/*
  CRUD method: Create a content object with valid params
  in the DB, save it and send it as an object.
*/
export function addNewUser(req, res) {
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
  User.find({ email: req.body.email }).exec((err, users) => {
    if (users.length >= 1) {
      return res.status(409).json({ error: 'This email is already used ' });
    }
    const finalUser = new User(req.body);
    console.log(req.body);
    finalUser.username = req.body.username;
    finalUser.email = req.body.email;
    finalUser.setPassword(req.body.password);
    finalUser.save((errorsave) => {
      if (errorsave) {
        return res.status(601).json(errorsave);
      }

      res.status(201).json(finalUser.toAuthJSON(false));
    });
  });
}

export function emailAvailable(req, res) {
  User.find({ email: req.body.email }).lean().exec((err, users) => {
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
export function updateUser(req, res) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (user === null) {
      res.status(400).json({ error: 'Server was unable to find this user' });
    }
    else {
      res.status(200).json({ message: 'The user has been successfully updated' });
    }
  });
}

/*
  CRUD method: Search an user with his id in the DB,
  Update his widgets and send back a confirmation.
*/
export function updateUserWidgets(req, res) {
  User.findOneAndUpdate({ _id: req.params.id }, { widgets: req.body }, { new: true }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (user === null) {
      res.status(400).json({ error: 'Server was unable to find this user' });
    }
    else {
      res.status(200).json({ message: 'The widgets have been successfully updated' });
    }
  })
}

/*
  CRUD method: Search a user object with his id in the DB and send back it's widget configuration.
*/
export function getUserWidgets(req, res) {
  User.findById(req.params.id)
    .select('widgets')
    .lean()
    .exec((error, user) => {
      if (error) {
        res.status(404).json(error);
      }
      else if (user === null) {
        res.status(404).json({ error: 'Server was unable to find this User' });
      }
      else {
        res.status(200).json(user);
      }
    });
}

/*
  CRUD method: Search a content object with his id in the DB,
  remove it and send back a confirmation.
*/
export function deleteUser(req, res) {
  User.delete({ _id: req.params.id }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (user === null) {
      res.status(400).json({ error: 'Server was unable to find this User' });
    }
    else {
      res.status(200).json(user);
    }
  });
}

export async function userLogin(req, res) {
  if (req.body.email === null || req.body.email === undefined) {
    return res.status(400).json({ error: 'Unable to find email in body' });
  }
  if (req.body.password === null || req.body.password === undefined) {
    return res.status(400).json({ error: 'Unable to find password in body' });
  }
  try {
    const users = await User.find({ email: req.body.email }).exec();
    if (users.length < 1) {
      return res.status(401).json({ message: 'Auth failed' });
    }
    /*
          Password checking using user method validPassword
         */
    const validPassword = users[0].validPassword(req.body.password);
    if (validPassword === false) {
      return res.status(401).json({ message: 'Auth failed' });
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
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
}