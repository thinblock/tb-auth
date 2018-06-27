const { send } = require('micro');
const { router, get, post } = require('microrouter')

const config = require('./src/config');
const corsDecorator = require ('./src/decorators/cors');
const auth = require('./src/authentication');
const apps = require('./src/apps');

// Initialises the DB
config.initDB();

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = router(
  post('/auth/login', corsDecorator(auth.login)),
  post('/auth/signup', corsDecorator(auth.signup)),
  get('/oauth2/apps', corsDecorator(apps.getApps)),
  post('/oauth2/apps', corsDecorator(apps.getApps)),
  post('/oauth2/token', hello),
  get('/*', notfound)
);