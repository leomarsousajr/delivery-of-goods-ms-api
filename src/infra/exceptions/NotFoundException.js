const Exception = require('./Exception');
const defaultErrorCode = '404';

module.exports = class NotFoundException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);
    this.error_type = 'notFound';
  }
};
