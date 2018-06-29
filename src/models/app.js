const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  name: {type: String, required: true},
  secret: {type: String, required: true},
  scope: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
}, {collection: 'apps'});

module.exports = mongoose.model('apps', UserSchema);
