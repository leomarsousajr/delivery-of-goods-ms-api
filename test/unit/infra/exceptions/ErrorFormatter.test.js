const errorFormatter = require('src/infra/exceptions/ErrorFormatter');

describe('infra :: exceptions :: ErrorFormatter', () => {
  const error = new Error('Some error');
  const formattedAppCode = '1-';
  const errorCode = 500;
  const appCode = '1';

  describe('#formatError', () => {
    describe('When the error is a string', () => {
      it('Should be successfully called', () => {
        const expected = { message: error.message };
        const result = errorFormatter.formatError(error.message);

        expect(result).toEqual(expected);
      });
    });

    describe('When the error is an error instance', () => {
      it('Should be successfully called', () => {
        const result = errorFormatter.formatError(error);

        expect(result).toEqual(error);
      });
    });
  });

  describe('#formatErrorMessage', () => {
    describe('When the error message is a function', () => {
      it('Should be successfully called', () => {
        const object = { message: jest.fn().mockReturnValue(error) };
        const result = errorFormatter.formatErrorMessage(object, []);

        expect(object.message).toHaveBeenCalledOnce();
        expect(result).toEqual(error);
      });
    });

    describe('When the error message is not a function', () => {
      it('Should be successfully called', () => {
        const result = errorFormatter.formatErrorMessage(error);

        expect(result).toEqual(error.message);
      });
    });
  });

  describe('#formatAppCode', () => {
    describe('When there is app code', () => {
      it('Should be successfully called', () => {
        const result = errorFormatter.formatAppCode(appCode);

        expect(result).toEqual(formattedAppCode);
      });
    });

    describe('When there is no app code', () => {
      it('Should be successfully called', () => {
        const expected = '';
        const result = errorFormatter.formatAppCode();

        expect(result).toEqual(expected);
      });
    });
  });

  describe('#formatErrorCode', () => {
    const expected = '1-500';

    describe('When there is a formatted error code', () => {
      it('Should be successfully called', () => {
        const result = errorFormatter.formatErrorCode(formattedAppCode, expected);

        expect(result).toEqual(expected);
      });
    });

    describe('When there is no formatted error code', () => {
      it('Should be successfully called', () => {
        const result = errorFormatter.formatErrorCode(formattedAppCode, errorCode);

        expect(result).toEqual(expected);
      });

      it('Should be successfully called', () => {
        const result = errorFormatter.formatErrorCode(formattedAppCode, undefined, errorCode);

        expect(result).toEqual(expected);
      });
    });
  });
});
