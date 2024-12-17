const HttpErrorMiddleware = require('src/interfaces/http/middlewares/HttpErrorMiddleware');

describe('interfaces :: http :: middlewares :: HttpErrorMiddleware', () => {
  let json, status, res, exceptionEnum, exception, logger, config, httpErrorMiddleware;
  const error = Object.assign(new Error('Some error'), { status_code: 500, stack_trace: 'Error: Error message\n ...' });

  describe('When the middleware is called', () => {
    beforeEach(() => {
      json = jest.fn();
      status = jest.fn();
      res = { status };
      exceptionEnum = { INTERNAL_ERROR: 'internalError' };
      exception = { internalError: jest.fn() };
      logger = { error: jest.fn() };
      config = { stackError: {} };
    });

    it('Should be successfully called', () => {
      const expected = expect.any(Function);

      httpErrorMiddleware = HttpErrorMiddleware({ exceptionEnum, exception, logger, config });

      expect(httpErrorMiddleware).toEqual(expected);
    });
  });

  describe('When the method is called and the stack trace is visible', () => {
    beforeEach(() => {
      json.mockReturnValue(error);
      status.mockReturnValue({ json });
      exception.internalError.mockReturnValue(error);
      config.stackError.isVisible = true;
    });

    it('Should be successfully called', () => {
      const result = httpErrorMiddleware(error, null, res, null);

      expect(logger.error).toHaveBeenCalledOnce();
      expect(logger.error).toHaveBeenCalledWith(error);
      expect(exception.internalError).toHaveBeenCalledOnce();
      expect(exception.internalError).toHaveBeenCalledWith(error);
      expect(status).toHaveBeenCalledOnce();
      expect(status).toHaveBeenCalledWith(error.status_code);
      expect(json).toHaveBeenCalledOnce();
      expect(json).toHaveBeenCalledWith({ details: [], stack_trace: error.stack_trace });
      expect(result).toEqual(error);
    });
  });

  describe('When the method is called and the stack trace is not visible', () => {
    beforeEach(() => {
      json.mockReturnValue(error);
      status.mockReturnValue({ json });
      exception.internalError.mockReturnValue(error);
      config.stackError.isVisible = false;
    });

    it('Should be successfully called', () => {
      const result = httpErrorMiddleware(error, undefined, res, undefined);

      expect(logger.error).toHaveBeenCalledOnce();
      expect(logger.error).toHaveBeenCalledWith(error);
      expect(exception.internalError).toHaveBeenCalledOnce();
      expect(exception.internalError).toHaveBeenCalledWith(error);
      expect(status).toHaveBeenCalledOnce();
      expect(status).toHaveBeenCalledWith(error.status_code);
      expect(json).toHaveBeenCalledOnce();
      expect(json).toHaveBeenCalledWith({ details: [], stack_trace: undefined });
      expect(result).toEqual(error);
    });
  });
});
