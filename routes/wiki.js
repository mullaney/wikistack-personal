var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
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
});

router.post('/', function (req, res, next) {
  return Page.create({
    title: req.body.title,
    content: req.body.content
  })
  .then(createdPage => {
    res.redirect(createdPage.route);
  })
  .catch(next);
});
