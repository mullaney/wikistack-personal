const { expect } = require('chai');
const { User, Page }   = require('../models');

describe('User model', () => {
  let user = {};
  beforeEach((done) => {
    user = User.build({
      name: 'Fred',
      email: 'fred@example.com'
    });
    done();
  });
  describe('name', () => {
    it('should exist', () => {
      expect(user.name).to.equal('Fred');
    });
  });
  describe('email', () => {
    it('should exist', () => {
      expect(user.email).to.equal('fred@example.com');
    });
  });
});

describe('Page model', () => {
  let page = {};
  beforeEach((done) => {
    page = Page.build({
      title: 'Example Page!',
      urlTitle: 'example_page',
      content: '# Example page',
      status: 'closed'
    });
    done();
  })
  describe('title', () => {
    it('should exist', () => {
      expect(page.title).to.equal('Example Page!');
    })
  });
  describe('urlTitle', () => {
    it('should exist', () => {
      expect(page.urlTitle).to.equal('example_page');
    });
  });
  describe('content', () => {
    it('should exist', () => {
      expect(page.content).to.equal('# Example page');
    });
  });
  describe('status', () => {
    it('should exist', () => {
      expect(page.status).to.equal('closed');
    });
  });
});
