const Sequelize     = require('sequelize');
const db            = new Sequelize('postgres://localhost:5432/wikistackp', {
  logging: false
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  route: {
    type: Sequelize.VIRTUAL,
    get() {
      return `/wiki/${this.urlTitle}`
    }
  }
}, {
  hooks: {
    beforeValidate: (page, options) => {
      page.urlTitle = page.title.toLowerCase().replace(/\s+/g, '_').replace(/\W/g, '');
    }
  }
});

module.exports = { db, User, Page };
