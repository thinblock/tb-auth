const { sign, verify } = require('jsonwebtoken');
const {handleErrors, createError} = require('micro-boom');
const User = require('../models/user');
const {secret} = require('../config');

module.exports = fn => handleErrors(async (req, res) => {
  const token = req.headers.Authorization || req.headers.authorization;
  if (!token) {
    throw createError(401, 'No Access Token was specified in the Request Headers');
  }

  try {
    const decodedToken = verify(token, secret);
    if (!decodedToken) {
      throw createError(401, 'Provided Access Token was invalid or expired');
    }
  } catch (e) {
    throw createError(401, 'Provided Access Token was invalid or expired');
  }
  
  try {
    const user = await User.findOne({_id: decodedToken.id});
    if (!user) {
      throw createError(401, 'Provided Access Token was invalid or expired');
    }
    req.decoded = {user_id: user._id};
    return fn(req, res);
  } catch(e) {
    throw createError(500, e);
  }
}, true);