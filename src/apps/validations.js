const Joi = require('joi');
const createValidator = require('micro-joi');

const createAppValidation = createValidator(Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
  }),
}));

const refreshSecretValidation = Joi.object({
  appId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});


module.exports = {
  createAppValidator: createAppValidation,
  refreshSecretValidator: obj => Joi.validate(obj, refreshSecretValidation),
};
