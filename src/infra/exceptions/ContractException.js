const Exception = require('./Exception');
const defaultErrorCode = '400';

module.exports = class ContractException extends Exception {
  constructor(error, appCode, ...params) {
    super(error, defaultErrorCode, appCode, ...params);

    this.error_type = 'contract';
    if (error.details) this.details = error.details;
  }
};
