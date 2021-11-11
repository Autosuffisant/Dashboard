import { dashboardnode } from '../db';

import schemaCountry from '../models/modelCountry';

const Country = dashboardnode.model('Country', schemaCountry);

/*
  CRUD method: Search all the categories objects in the DB and send them as an array.
*/
export function getCountries(req, res) {
  Country.find({}).lean().exec((err, country) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).json(country);
    }
  });
}

/*
  CRUD method: Search a country object with his id in the DB and send it as an object.
*/
export function getCountry(req, res) {
  Country.findById(req.params.id).lean().exec((error, country) => {
    if (error) {
      res.status(404).json(error);
    }
    else if (country === null) {
      res.status(400).send({ error: 'Unable to find this country' });
    }
    else {
      res.status(200).json(country);
    }
  });
}

/*
  CRUD method: Create a country object with valid params
  in the DB, save it and send it as an object.
*/
export function addNewCountry(req, res) {
  var country = new Country();

  country.name = req.body.name;
  country.initial = req.body.initial;

  country.save((err) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(201).json(country);
    }
  });
}

/*
  CRUD method: Modify a country object with valid params
  in the DB, save it and send it as an object.
*/
export function updateCountry(req, res) {
  Country.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, country) => {
    if (error) {
      res.status(400).json(error);
    }
    else if (country === null) {
      res.status(400).send({ error: 'Unable to find this country' });
    }
    else {
      res.status(200).json(country);
    }
  });
}

/*
  CRUD method: Search a country object with his id in the DB,
  remove it and send back a confirmation.
*/
export function deleteCountry(req, res) {
  Country.deleteOne({ _id: req.params.id }, (error, country) => {
    if (error) {
      res.status(404).json(error);
    }
    else if (country === null) {
      res.status(400).send({ error: 'Unable to find this country' });
    }
    else {
      res.status(200).json(country);
    }
  });
}
