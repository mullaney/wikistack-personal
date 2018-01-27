const { expect } = require('chai');

describe('True', () => {
  it('should be true', () => {
    expect(true).to.equal(true);
  });
})

// example of handing basic validation tests:

describe('User model', () => {
  let user = {};
  beforeEach((done) => {
    user = User.build({
      username: 'Fred'
    });
    done();
  });
  describe('username', () => {
    it('should exist', () => {
      expect(user.username).to.equal('Fred');
    });
    it('should not be null', () => {
      user.username = null;
      user.validate()
      .then(() => {
        throw new Error('Validated with null username')
      })
      .catch(err => {
        expect(err.message).to.not.equal('Validated with null username');
      });
    });
  });
});
