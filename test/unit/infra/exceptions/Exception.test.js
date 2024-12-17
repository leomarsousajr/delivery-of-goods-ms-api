const {
  formatError,
  formatAppCode,
  formatErrorCode,
  formatErrorMessage
} = require('src/infra/exceptions/ErrorFormatter');
const Exception = require('src/infra/exceptions/Exception');

jest.mock('src/infra/exceptions/ErrorFormatter');

describe('infra :: exceptions :: Exception', () => {
  const error = new Error('Some error');
  const formattedErrorCode = '1-500';
  const formattedAppCode = '1-';
  const errorCode = 500;
  const appCode = '1';

  beforeEach(() => {
    formatError.mockReturnValue(error);
    formatAppCode.mockReturnValue(formattedAppCode);
    formatErrorCode.mockReturnValue(formattedErrorCode);
    formatErrorMessage.mockReturnValue(error.message);
  });

  it('Should be successfully called', () => {
    const exception = new Exception(error, errorCode, appCode);

    expect(formatError).toHaveBeenCalledOnce();
    expect(formatError).toHaveBeenCalledWith(error);
    expect(formatErrorMessage).toHaveBeenCalledOnce();
    expect(formatErrorMessage).toHaveBeenCalledWith(error, []);
    expect(formatAppCode).toHaveBeenCalledOnce();
    expect(formatAppCode).toHaveBeenCalledWith(appCode);
    expect(formatErrorCode).toHaveBeenCalledOnce();
    expect(formatErrorCode).toHaveBeenCalledWith(formattedAppCode, undefined, errorCode);
    expect(exception.error_code).toEqual(formattedErrorCode);
    expect(exception.params).toEqual([]);
    expect(exception).toEqual(error);
  });
});
