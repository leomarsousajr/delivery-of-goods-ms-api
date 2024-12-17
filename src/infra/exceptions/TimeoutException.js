const Exception = require('./Exception');
const defaultErrorCode = '504';

module.exports = class TimeoutException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);
    this.error_type = 'timeout';
  }
};
