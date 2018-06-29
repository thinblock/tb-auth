const Joi = require('joi');
const createValidator = require('micro-joi');

const createAppValidation = createValidator(Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
  })
}));


module.exports = {
  createAppValidator: createAppValidation,
};