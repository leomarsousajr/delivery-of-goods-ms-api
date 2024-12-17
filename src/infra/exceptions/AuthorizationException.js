const Exception = require('./Exception');
const defaultErrorCode = '401';
const defaultErrorMessage = 'Unauthorized access';
module.exports = class AuthorizationException extends Exception {
  constructor(error = defaultErrorMessage, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);
    this.error_type = 'authorization';
  }
};
