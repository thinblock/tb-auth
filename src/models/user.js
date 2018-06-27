const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model(
  'User',
  new Schema({ username: String, password: String, token: String }),
  'User'
);
