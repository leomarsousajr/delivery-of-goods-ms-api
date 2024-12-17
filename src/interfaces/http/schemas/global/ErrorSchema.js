const joi = require('joi');

module.exports = () =>
  joi
    .object({
      error_code: joi.string().required().example('1-500'),
      message: joi.string().required().example('Error message'),
      details: joi
        .array()
        .items(
          joi.object({
            message: joi.string().required().example('"field" is required'),
            path: joi.array().items(joi.string().required()).required().example(['field'])
          })
        )
        .required(),
      stack_trace: joi.string().example('Error: Error message\n ...')
    })
    .required();
