const { json } = require('micro');
const { handleErrors, createError } = require('micro-boom');
const { sign } = require('jsonwebtoken');
const { compareSync, hash } = require('bcrypt');

const { secret } = require('../config');
const { signupValidator, loginValidator } = require('./validations');
const User = require('../models/user');

const signup = async (req) => {
  try {
    const body = await json(req);
    const user = await User.findOne({ email: body.email });
    if (user) {
      return { error: true, message: 'A User with this email already exist.' };
    }

    const passwordHash = await hash(body.password, 12);

    const userModel = new User({ ...body, password: passwordHash, auth_provider: 'EMAIL' });
    await userModel.save();
    return { success: true, message: 'User created successfully' };
  } catch (e) {
    throw createError(500, e);
  }
};

const login = async (req) => {
  try {
    const { email, password } = await json(req);
    const user = await User.findOne({ email });
    if (!user) {
      return { error: true, message: 'Email or password doesnt match' };
    }

    if (!compareSync(password, user.password)) {
      return { error: true, message: 'Email or password doesnt match' };
    }
    return { access_token: sign({ id: user._id }, secret) };
  } catch (e) {
    throw createError(500, e);
  }
};

module.exports = {
  signup: handleErrors(signupValidator(signup), true),
  login: handleErrors(loginValidator(login), true),
};
