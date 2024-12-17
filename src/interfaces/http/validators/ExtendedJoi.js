const Joi = require('joi');

const extendedJoi = Joi.extend((joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {},
  rules: {}
}));

module.exports = extendedJoi;
