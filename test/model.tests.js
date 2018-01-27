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
  describe('virtual route', () => {
    it('should exist', () => {
      expect(page.route).to.equal('/wiki/example_page');
    });
  })
});

describe('Page hooks', () => {
  describe('beforeValidate', () => {
    let newPage;
    beforeEach(() => {
      return Page.sync({ force: true })
      .then(() => {
        return Page.create({
          title: 'Another Example Page!',
          content: '# Example page',
          status: 'closed'
        });
      })
      .then(p => {
        newPage = p;
      })
      .catch(err => {
        console.log(err);
      });
    });
    it('should be set at validation based on title', () => {
      newPage.save()
      .then(page => {
        expect(page.urlTitle).to.equal('another_example_page');
      })
    });
  });
})
