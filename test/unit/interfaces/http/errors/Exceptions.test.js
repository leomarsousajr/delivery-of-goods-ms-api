const OperationException = require('src/infra/exceptions/OperationException');
const Exception = require('src/interfaces/http/errors/Exception');

jest.mock('src/infra/exceptions/OperationException');

describe('interfaces :: http :: errors :: Exception', () => {
  let httpConstants, appCode, exception;
  const details = [{ message: '"field" is required', path: ['field'] }];
  const error = { error_code: '8-500', message: 'Error message', stack: 'Error: Error message\n ...' };

  beforeEach(() => {
    httpConstants = {
      code: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        UNPROCESSABLE_ENTITY: 422,
        INTERNAL_SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
      },
      message: {
        INTERNAL_SERVER_ERROR: 'Internal Server Error'
      }
    };
    appCode = '8';
    exception = Exception({ httpConstants, appCode });
    OperationException.mockReturnValue(error);
  });

  describe('#business', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 422,
        message: 'Error message',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.business(error);

      expect(result).toEqual(expected);
    });
  });

  describe('#authorization', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 401,
        message: 'Error message',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.authorization(error);

      expect(result).toEqual(expected);
    });
  });
  describe('#internalError', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 500,
        message: 'Internal Server Error',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.internalError(error);

      expect(result).toEqual(expected);
    });
  });
  describe('#contract', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 400,
        message: 'Error message',
        details: [],
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.contract(error);

      expect(result).toEqual(expected);
    });

    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 400,
        message: 'Error message',
        details,
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.contract({ ...error, details });

      expect(result).toEqual(expected);
    });
  });

  describe('#integration', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 503,
        message: 'Error message',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.integration(error);

      expect(result).toEqual(expected);
    });
  });

  describe('#notFound', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 404,
        message: 'Error message',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.notFound(error);

      expect(result).toEqual(expected);
    });
  });

  describe('#operation', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 500,
        message: 'Error message',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.operation(error);

      expect(result).toEqual(expected);
    });
  });

  describe('#timeout', () => {
    it('Should be successfully called', () => {
      const expected = {
        error_code: '8-500',
        status_code: 504,
        message: 'Error message',
        stack_trace: 'Error: Error message\n ...'
      };
      const result = exception.timeout(error);

      expect(result).toEqual(expected);
    });
  });
});
