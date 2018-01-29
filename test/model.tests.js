const { expect } = require('chai');
const { db, User, Page }   = require('../models');

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

describe('Author association', () => {
  beforeEach(() => {
    return db.sync({force: true})
    .then(() => {
      return User.bulkCreate([
        {
          name: 'David Dunbar II',
          email: 'dave@example.com'
        },
        {
          name: 'Sally Bates',
          email: 'sally@example.com'
        },
        {
          name: 'Mara Underwood',
          email: 'marsy@example.com'
        }
      ], {returning: true});
    })
    .then(users => {
      return Page.bulkCreate([
        {
          title: 'David\'s page',
          urlTitle: 'davids_page',
          content: 'that only dave cares about',
          authorId: users[0].id
        }, {
          title: 'Sally\'s page',
          urlTitle: 'sallys_page',
          content: 'Sally loves this page',
          authorId: users[1].id
        }, {
          title: 'Another page by David',
          urlTitle: 'another_page_by_david',
          content: 'Everyone loves this page',
          authorId: users[0].id
        }
      ]);
    });
  });
  it('should find pages by a particular author', () => {
    User.findOne({
      where: { email: 'dave@example.com' }
    })
    .then(user => {
      return Page.findAll({
        where: {authorId: user.id}
      })
    })
    .then(pages => {
      expect(pages.length).to.equal(true);
    })
  });
});

describe('Page hooks', () => {
  describe('beforeValidate', () => {
    let newPage;
    beforeEach(() => {
      return db.sync({ force: true })
      .then(() => {
        console.log('create user')
        return User.create({
          name: 'Kevin',
          email: 'kevin@example.com'
        })
      })
      .then(user => {
        console.log('create page')
        return Page.create({
          title: 'Another Example Page!',
          content: '# Example page',
          status: 'closed',
          authorId: user.id
        });
      })
      .then(p => {
        console.log('save page')
        newPage = p;
      })
      .catch(err => {
        console.log('before each error', err);
      });
    });
    it('should be set at validation based on title', () => {
      newPage.save()
      .then(page => {
        expect(page.urlTitle).to.equal('another_example_page');
      })
      .catch(err => {
        console.log('save error', err)
      })
    });
  });
})
