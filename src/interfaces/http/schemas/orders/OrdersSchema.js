const joi = require('src/interfaces/http/validators/ExtendedJoi');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/schemas/global/ErrorSchema')} ctx.errorSchema
 */
module.exports = ({ errorSchema }) => ({
  query: joi
    .object({
      limit: joi.number().integer().min(1).prefs({ convert: true }),
      offset: joi.number().integer().min(0).prefs({ convert: true }),
      sort: joi.string().valid('ASC', 'DESC').default('DESC'),
      search: joi.string()
    })
    .required(),
  body: joi
    .object({
      client_name: joi.string().min(3).max(50).required(),
      date: joi.string().required(),
      longitude: joi.string().min(3).max(50).required(),
      latitude: joi.string().min(3).max(50).required()
    })
    .required(),
  responses: {
    400: errorSchema
  }
});
