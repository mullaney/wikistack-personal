const Sequelize = require('sequelize');
const db        = new Sequelize('postgres://localhost:5432/wikistackp');

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

const Page = db.define('page', {
  title: Sequelize.STRING,
  urlTitle: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

module.exports = { db, User, Page };
