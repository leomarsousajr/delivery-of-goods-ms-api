const Exception = require('./Exception');
const defaultErrorCode = '422';

module.exports = class BusinessException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);
    this.error_type = 'business';
  }
};
