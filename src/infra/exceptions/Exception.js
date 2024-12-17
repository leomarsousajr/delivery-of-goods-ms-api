const { formatError, formatErrorMessage, formatAppCode, formatErrorCode } = require('./ErrorFormatter');

module.exports = class Exception extends Error {
  constructor(error, defaultErrorCode, appCode, ...params) {
    const err = formatError(error);
    const message = formatErrorMessage(err, params);
    const appCodeFormat = formatAppCode(appCode);

    super(message);
    this.error_code = formatErrorCode(appCodeFormat, err.error_code, defaultErrorCode);
    this.params = params;
  }
};
