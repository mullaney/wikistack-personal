const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const path        = require('path');
const nunjucks    = require('nunjucks');
const wikiRouter  = require('./routes/wiki');

// app.use(morgan('dev')); // logging

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/wiki', wikiRouter)

app.get('/', function(req, res, done) {
  res.render('index.html');
  done();
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!err.message) err.message = 'Internal Error'
  res.status(err.status || 500)
  res.render('error', { err });
})

module.exports = app;
