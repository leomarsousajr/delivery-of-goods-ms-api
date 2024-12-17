const TimeoutException = require('src/infra/exceptions/TimeoutException');

describe('infra :: exceptions :: TimeoutException', () => {
  const error = new Error('Some error');

  it('Should be successfully called', () => {
    const exception = new TimeoutException(error);

    expect(exception.error_type).toEqual('timeout');
    expect(exception).toEqual(error);
  });
});
