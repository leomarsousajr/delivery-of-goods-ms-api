const OperationException = require('src/infra/exceptions/OperationException');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/constants/HttpConstants')} ctx.httpConstants
 */
module.exports = ({ httpConstants }) => ({
  contract: ({ error_code, message, details = [], stack }) => ({
    error_code,
    status_code: httpConstants.code.BAD_REQUEST,
    message,
    details: details.map((detail) => ({
      message: detail.message,
      path: detail.path
    })),
    stack_trace: stack
  }),
  internalError: (error) => {
    error = new OperationException(error);
    return {
      error_code: error.error_code,
      status_code: httpConstants.code.INTERNAL_SERVER_ERROR,
      message: httpConstants.message.INTERNAL_SERVER_ERROR,
      stack_trace: error.stack
    };
  },
  authorization: ({ error_code, message, stack }) => ({
    error_code,
    status_code: httpConstants.code.UNAUTHORIZED,
    message,
    stack_trace: stack
  }),
  notFound: ({ error_code, message, stack }) => ({
    error_code,
    status_code: httpConstants.code.NOT_FOUND,
    message,
    stack_trace: stack
  }),
  business: ({ error_code, message, stack }) => ({
    error_code,
    status_code: httpConstants.code.UNPROCESSABLE_ENTITY,
    message,
    stack_trace: stack
  }),
  operation: ({ error_code, message, stack }) => ({
    error_code,
    status_code: httpConstants.code.INTERNAL_SERVER_ERROR,
    message,
    stack_trace: stack
  }),
  integration: ({ error_code, message, stack }) => ({
    error_code,
    status_code: httpConstants.code.SERVICE_UNAVAILABLE,
    message,
    stack_trace: stack
  }),
  timeout: ({ error_code, message, stack }) => ({
    error_code,
    status_code: httpConstants.code.GATEWAY_TIMEOUT,
    message,
    stack_trace: stack
  })
});
