const supertest         = require('supertest');
const app               = require('../app');
const agent             = supertest.agent(app);
const { db, Page, User} = require('../models');
const chai              = require('chai')
const $expect           = chai.expect;

describe('Routes', () => {
  describe('/ GET', () => {
    it('should return a 200 status', (done) => {
      agent
      .get('/')
      .expect(200, done);
    });
  });
  describe('/wiki/', () => {
    describe('GET', () => {
      it('should redirect to / with a 302 status', (done) => {
        agent
        .get('/wiki/')
        .expect(302)
        .expect('location', '/')
        .end(done)
      });
    });
    describe('POST', () => {
      before(() => {
        return Page.sync({force: true});
      });
      it('with valid content should redirect to proper page', (done) => {
        agent
        .post('/wiki')
        .send({ title: 'New page title!', content: 'some new content' })
        .expect('location', '/wiki/new_page_title')
        .expect(302)
        .end(done)
      });
    });
  });
  describe('/wiki/add', () => {
    describe('GET', () => {
      it('should return a 200 status', (done) => {
        agent
        .get('/wiki/add')
        .expect('Content-Type', /html/)
        .expect(200, done);
      });
    });
  });
  describe('/wiki/:page GET', () => {
    describe('GET a page', () => {
      before(() => {
        return Page.sync({force: true})
        .then(() => {
          Page.create({
            title: 'My new page',
            content: '# New content'
          })
        });
      });

      it('should get the proper page', (done) => {
        agent
        .get('/wiki/my_new_page')
        .expect(200)
        .end(done)
      })
    })
  })
});
