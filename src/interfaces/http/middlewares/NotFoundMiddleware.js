const NotFoundException = require('src/infra/exceptions/NotFoundException');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/constants/HttpConstants')} ctx.httpConstants
 */
module.exports = ({ httpConstants, config }) => {
  return (_req, _res, next) => {
    next(new NotFoundException(httpConstants.message.NOT_FOUND, config.APP_CODE));
  };
};
