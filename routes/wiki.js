const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');

module.exports = router;

router.get('/', function (req, res, next) {
  // res.status(200);
  res.redirect('/');
});

router.get('/add', function (req, res, next) {
  res.status(200);
  res.render('addpage');
})

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: { urlTitle: req.params.urlTitle }
  })
  .then(page => {
    res.status(200);
    res.render('wikipage', { page });
  })
  .catch(next);
});

router.post('/add', function (req, res, next) {
  // console.log(req.body.name);
  return User.findOrCreate({
    where: {
      name: req.body.username,
      email: req.body.email
    }
  })
  .then((userArray) => {
    let user = userArray[0];
    return Page.create({
      title: req.body.title,
      content: req.body.content,
      authorId: user.id
    })
    .then(createdPage => {
      res.redirect(createdPage.route);
    })
    .catch(next);
  })
  .catch(next);
});
