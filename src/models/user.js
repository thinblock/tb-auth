const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  email_verified: {type: Boolean, default: false},
  auth_provider: {
    type: String,
    required: true,
    enum: ['EMAIL', 'GOOGLE', 'FACEBOOK']
  },
  password: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
}, {collection: 'users'});

module.exports = mongoose.model('users', UserSchema);
