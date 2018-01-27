const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const path        = require('path');
const nunjucks    = require('nunjucks');
const { db }      = require('./models');
const FORCE_SYNC  = true;
const PORT        = 3000;

app.use(morgan('dev')); // logging

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/', function(req, res) {
  res.render('index.html');
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Error' );
})

db.sync({ force: FORCE_SYNC })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})
.catch(err => {
  console.log(err)
})
