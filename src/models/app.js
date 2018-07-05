const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppSchema = new Schema({
  name: { type: String, required: true },
  secret_hash: { type: String, required: true },
  scope: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { collection: 'apps' });

module.exports = mongoose.model('apps', AppSchema);
