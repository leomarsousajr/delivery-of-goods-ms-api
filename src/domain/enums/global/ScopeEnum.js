const enumFactory = require('src/domain/factories/global/EnumFactory');

module.exports = () =>
  enumFactory({
    ROUTE_SUFFIX: 'Routes',
    MODEL_SUFFIX: 'Model'
  });
