'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newButton;

describe('Button API:', function() {
  describe('GET /api/buttons', function() {
    var buttons;

    beforeEach(function(done) {
      request(app)
        .get('/api/buttons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          buttons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(buttons).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/buttons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/buttons')
        .send({
          name: 'New Button',
          info: 'This is the brand new button!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newButton = res.body;
          done();
        });
    });

    it('should respond with the newly created button', function() {
      expect(newButton.name).to.equal('New Button');
      expect(newButton.info).to.equal('This is the brand new button!!!');
    });
  });

  describe('GET /api/buttons/:id', function() {
    var button;

    beforeEach(function(done) {
      request(app)
        .get(`/api/buttons/${newButton._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          button = res.body;
          done();
        });
    });

    afterEach(function() {
      button = {};
    });

    it('should respond with the requested button', function() {
      expect(button.name).to.equal('New Button');
      expect(button.info).to.equal('This is the brand new button!!!');
    });
  });

  describe('PUT /api/buttons/:id', function() {
    var updatedButton;

    beforeEach(function(done) {
      request(app)
        .put(`/api/buttons/${newButton._id}`)
        .send({
          name: 'Updated Button',
          info: 'This is the updated button!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedButton = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedButton = {};
    });

    it('should respond with the updated button', function() {
      expect(updatedButton.name).to.equal('Updated Button');
      expect(updatedButton.info).to.equal('This is the updated button!!!');
    });

    it('should respond with the updated button on a subsequent GET', function(done) {
      request(app)
        .get(`/api/buttons/${newButton._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let button = res.body;

          expect(button.name).to.equal('Updated Button');
          expect(button.info).to.equal('This is the updated button!!!');

          done();
        });
    });
  });

  describe('PATCH /api/buttons/:id', function() {
    var patchedButton;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/buttons/${newButton._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Button' },
          { op: 'replace', path: '/info', value: 'This is the patched button!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedButton = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedButton = {};
    });

    it('should respond with the patched button', function() {
      expect(patchedButton.name).to.equal('Patched Button');
      expect(patchedButton.info).to.equal('This is the patched button!!!');
    });
  });

  describe('DELETE /api/buttons/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/buttons/${newButton._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when button does not exist', function(done) {
      request(app)
        .delete(`/api/buttons/${newButton._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
