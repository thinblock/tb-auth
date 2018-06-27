const { json, send, createError } = require('micro');
const {handleErrors, createError} = require('micro-boom');
const { sign, verify } = require('jsonwebtoken');
const { compareSync, hash } = require('bcrypt');

const { secret } = require('../config');
const {signupValidator} = require('./validations');
const User = require('../models/user');

const signup = async (req, res) => {
  const body = await json(req);
  try {
    const user = await User.findOne({email: body.email});
    if (user) {
      return {error: true, message: 'A User with this email already exist.'};
    }
  
    const passwordHash = await hash(body.password, 12);
  
    const userModel = new User({...body, password: passwordHash});
    await userModel.save();
  } catch (e) {
    throw createError(500);
  }
};

const login = async (req, res) => {
  const body = await json(req);
  try {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return {error: true, message: 'Email or password doesnt match'};
    }
    
    if (!compareSync(body.password, user.password)) {
      return {error: true, message: 'Email or password doesnt match'};
    }

    return { token: sign({id: user._id}, secret) };
  } catch (e) {
    throw createError(500);
  }
};

module.exports = {
  signup: handleErrors(signupValidator(signup)),
  login: handleErrors(signupValidator(login))
}