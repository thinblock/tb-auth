const { sign, verify } = require('jsonwebtoken');
const {handleErrors, createError} = require('micro-boom');
const User = require('../models/user');
const {secret} = require('../config');

module.exports = fn => handleErrors(async (req, res) => {
  const token = req.headers.Authorization || req.headers.authorization;
  if (!token) {
    return createError(401, 'No Access Token was specified in the Request Headers');
  }
  const decodedToken = verify(token, secret);

  if (!decodedToken) {
    return createError(401, 'Provided Access Token was invalid or expired');
  }
  try {
    const user = await User.findOne({_id: decodedToken.id});
    if (!user) {
      return createError(401, 'Provided Access Token was invalid or expired');
    }

    return fn(Object.assign(req, {user_id: user._id}), res);
  } catch(e) {
    return createError(500);
  }
}, true);