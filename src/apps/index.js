const {json} = require('micro');
const {handleErrors, createError} = require('micro-boom');
const hat = require('hat');
const App = require('../models/app');

const getApps = async (req, res) => {
  const user = req.user_id;
  try {
    const apps = (await App.find({user})).map(app => {
      const {secret, ...rest} = app;
      return rest;
    });
    return apps;
  } catch(e) {
    return createError(500);
  }
};

const createApp = async (req, res) => {
  const user = req.user_id;
  try {
    const {name} = await json(req);
    const Rack = hat.rack(); // Create client_secret
    const app = new App({name, secret: Rack(), user});
    await app.save();
    return app;
  } catch(e) { 
    return createError(500);
  } 
};

module.exports = {
  getApps: handleErrors(createApp, true),
  createApp: handleErrors(createApp, true)
}