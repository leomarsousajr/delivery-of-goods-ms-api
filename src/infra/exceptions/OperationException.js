const Exception = require('./Exception');
const defaultErrorCode = '500';

module.exports = class OperationException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);
    this.error_type = 'operation';
  }
};
