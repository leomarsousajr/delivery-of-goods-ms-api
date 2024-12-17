const enumFactory = require('src/domain/factories/global/EnumFactory');

module.exports = () =>
  enumFactory({
    INTERNAL_ERROR: 'internalError',
    CONTRACT: 'contract',
    AUTHORIZATION: 'authorization',
    NOT_FOUND: 'notFound',
    BUSINESS: 'business',
    OPERATION: 'operation',
    INTEGRATION: 'integration',
    TIMEOUT: 'timeout'
  });
