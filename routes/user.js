var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;

module.exports = router;

router.get('/:id', function (req, res, next) {
  const userPromise = User.findById(req.params.id);
  const pagesPromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  })

  Promise.all([userPromise, pagesPromise])
  .then((results) => {
    const user = results[0];
    const pages = results[1];
    res.render('user', { user, pages });
  });
});