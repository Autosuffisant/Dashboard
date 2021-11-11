import { dashboardnode } from '../db';

import schemaLanguage from '../models/modelLanguage';

const Language = dashboardnode.model('Language', schemaLanguage);

/*
  CRUD method: Search all the categories objects in the DB and send them as an array.
*/
export function getLanguages(req, res) {
  Language.find({}).lean().exec((err, language) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).json(language);
    }
  });
}

/*
  CRUD method: Search a language object with his id in the DB and send it as an object.
*/
export function getLanguage(req, res) {
  Language.findById(req.params.id).lean().exec((error, language) => {
    if (error) {
      res.status(404).json(error);
    }
    else if (language === null) {
      res.status(400).send({ error: 'Unable to find this language' });
    }
    else {
      res.status(200).json(language);
    }
  });
}

/*
  CRUD method: Create a language object with valid params
  in the DB, save it and send it as an object.
*/
export function addNewLanguage(req, res) {
  var language = new Language();

  language.name = req.body.name;
  language.initial = req.body.initial;

  language.save((err) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(201).json(language);
    }
  });
}

/*
  CRUD method: Modify a language object with valid params
  in the DB, save it and send it as an object.
*/
export function updateLanguage(req, res) {
  Language.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, language) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (language === null) {
      res.status(400).send({ error: 'Unable to find this language' });
    }
    else {
      res.status(200).json(language);
    }
  });
}

/*
  CRUD method: Search a language object with his id in the DB,
  remove it and send back a confirmation.
*/
export function deleteLanguage(req, res) {
  Language.deleteOne({ _id: req.params.id }, (error, language) => {
    if (error) {
      res.status(404).json(error);
    }
    else if (language === null) {
      res.status(400).send({ error: 'Unable to find this language' });
    }
    else {
      res.status(200).json(language);
    }
  });
}
