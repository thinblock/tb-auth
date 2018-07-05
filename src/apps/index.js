const {json} = require('micro');
const {hash} = require('bcrypt');
const {createError} = require('micro-boom');
const hat = require('hat');
const App = require('../models/app');
const {createAppValidator, refreshSecretValidator} = require('./validations');

const getApps = async (req, res) => {
  const user = req.decoded.user_id;
  try {
    const apps = (await App.find({user})).map(app => {
      const {secret_hash, user, ...rest} = app.toObject();
      return {...rest, client_id: rest._id};
    });
    return apps;
  } catch(e) {
    throw createError(500, e);
  }
};

const createApp = async (req, res) => {
  const userId = req.decoded.user_id;
  try {
    const {name} = await json(req);
    const Rack = hat.rack(); // Create client_secret
    const secret = Rack();
    const app = new App({name, secret_hash: await hash(secret, 12), user: userId});
    await app.save();
    const {secret_hash, user, updated_at, ...rest} = app.toObject();
    return {...rest, client_id: rest._id, client_secret: secret};
  } catch(e) {
    throw createError(500, e);
  } 
};

const refreshSecret = async (req, res) => {
  const validation = refreshSecretValidator(req.params);
  if (validation.error) {
    throw createError(400, validation.error);
  }
  const userId = req.decoded.user_id;
  const _id = req.params.appId;
  try {
    const Rack = hat.rack(); // Create client_secret
    const secret = Rack();
    const app = await App.findOne({_id, user: userId});

    if (!app) {
      return {error: true, message: 'App not found'};
    }
    app.secret_hash = await hash(secret, 12);
    await app.save();
    const {secret_hash, user, updated_at, ...rest} = app.toObject();
    return {...rest, client_id: rest._id, client_secret: secret};
  } catch(e) {
    throw createError(500, e);
  } 
};

module.exports = {
  getApps,
  createApp: createAppValidator(createApp),
  refreshSecret
}