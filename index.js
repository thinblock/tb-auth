const { send } = require('micro');
const { router, get, post } = require('microrouter')

const config = require('./src/config');
const corsDecorator = require ('./src/decorators/cors');
const authDecorator = require ('./src/decorators/auth');
const auth = require('./src/authentication');
const apps = require('./src/apps');

// Initialises the DB
if (process.env.NODE_ENV !== 'test') {
  config.initDB();
}

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = router(
  post('/auth/login', corsDecorator(auth.login)),
  post('/auth/signup', corsDecorator(auth.signup)),
  get('/apps', corsDecorator(authDecorator(apps.getApps))),
  post('/apps', corsDecorator(authDecorator(apps.createApp))),
  post('/apps/:appId/refresh_secret', corsDecorator(authDecorator(apps.refreshSecret))),
  get('/*', notfound)
);