/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/enums/global/ExceptionEnum')} ctx.exceptionEnum
 * @param {import('src/interfaces/http/errors/Exception')} ctx.exception
 * @param {import('src/infra/logging/Logger')} ctx.logger
 */
module.exports = ({ exceptionEnum, exception, logger, config }) => {
  // eslint-disable-next-line no-unused-vars
  return (err, _req, res, _next) => {
    logger.error(err);

    const errorCode = (err.error_code ?? '').split('-')[1];
    const method = exceptionEnum[errorCode] ?? err.error_type ?? exceptionEnum.INTERNAL_ERROR;
    const { status_code, ...error } = exception[method](err);

    error.details = error.details ?? [];
    error.stack_trace = config.stackError?.isVisible === true ? error.stack_trace : undefined;

    return res.status(status_code).json(error);
  };
};
