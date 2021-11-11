/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// During the test the env variable is set to test
import schemaUser from '../src/models/modelUser';
import { getAuth } from './category';

process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/testServer');

const should = chai.should();

const User = mongoose.model('User', schemaUser);

chai.use(chaiHttp);

const auth = {};
before(getAuth(auth));

describe('User', () => {
  it('it should GET all the Users', (done) => {
    chai.request(server)
      .get('/user/')
      .set('authorization', `Token ${auth.token}`).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  /*  it('it should POST a User in the DB', (done) => {
    const user = new User();
    user.email = 'jane.doe@gmail.com';
    user.password = 'azertyuop';
    chai.request(server)
      .post('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('email');
        res.body.should.have.property('token');
        done();
      });
  }); */

  it('it should UPDATE a User given the id', (done) => {
    const user = new User();
    user.email = 'jon.doe@gmail.com';
    user.password = 'azertyuop';
    user.admin = true;
    user.save((err, data) => {
      chai.request(server)
        .put(`/user/${data.id}`)
        .set('authorization', `Token ${auth.token}`)
        .send({
          email: 'jane.doe@gmail.com'
        })
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  it('it should GET a user by the given id', (done) => {
    const user = new User();
    user.email = 'jon.doe@gmail.com';
    user.password = 'azertyiop';
    user.admin = true;
    user.save((err, data) => {
      chai.request(server)
        .get(`/user/${data.id}`)
        .set('authorization', `Token ${auth.token}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('email');
          res.body.should.have.property('_id').eql(data.id);
          done();
        });
    });
  });

  it('it should DELETE a user given the id', (done) => {
    const user = new User();
    user.email = 'jon.doe@gmail.com';
    user.password = 'azertyiop';
    user.admin = true;
    user.save((err, data) => {
      chai.request(server)
        .delete(`/user/${data.id}`)
        .set('authorization', `Token ${auth.token}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('ok').eql(1);
          res.body.should.have.property('n').eql(1);
          done();
        });
    });
  });
});
