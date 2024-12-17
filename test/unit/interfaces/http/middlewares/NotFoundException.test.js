const NotFoundException = require('src/infra/exceptions/NotFoundException');
const NotFoundMiddleware = require('src/interfaces/http/middlewares/NotFoundMiddleware');

jest.mock('src/infra/exceptions/NotFoundException');

describe('interfaces :: http :: middlewares :: NotFoundMiddleware', () => {
  let next, httpConstants, notFoundMiddleware, config;
  const error = new Error('Some error');

  beforeEach(() => {
    next = jest.fn();
    httpConstants = { message: { NOT_FOUND: 'Not Found' } };
    config = { appCode: 1 };
    NotFoundException.mockReturnValue(error);
  });

  describe('When the middleware is called', () => {
    it('Should be successfully called', () => {
      const expected = expect.any(Function);

      notFoundMiddleware = NotFoundMiddleware({ httpConstants, config });

      expect(notFoundMiddleware).toEqual(expected);
    });
  });

  describe('When the method is called', () => {
    it('Should be successfully called', () => {
      const result = notFoundMiddleware(null, null, next);

      expect(NotFoundException).toHaveBeenCalledOnce();
      expect(NotFoundException).toHaveBeenCalledWith(httpConstants.message.NOT_FOUND, config.APP_CODE);
      expect(next).toHaveBeenCalledOnce();
      expect(next).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();
    });
  });
});
