const { db }      = require('./models');
const app         = require('./app');
const FORCE_SYNC  = true;
const PORT        = 3000;


db.sync({ force: FORCE_SYNC })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})
.catch(err => {
  console.log(err)
})
