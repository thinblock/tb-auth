const Joi = require('joi');
const createValidator = require('micro-joi');

const signupValidations = createValidator(Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.string().required().min(5)
  })
}));

const loginValidations = createValidator(Joi.object({
  body: Joi.object({
    email: Joi.email().required(),
    password: Joi.string().required().min(5)
  })
}));

module.exports = {
  signupValidator,
  loginValidations
};