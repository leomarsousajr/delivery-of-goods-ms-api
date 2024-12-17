const Exception = require('./Exception');
const defaultErrorCode = '503';

module.exports = class IntegrationException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);
    this.error_type = 'integration';
  }
};
