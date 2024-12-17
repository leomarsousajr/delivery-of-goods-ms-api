const BusinessException = require('src/infra/exceptions/BusinessException');

describe('infra :: exceptions :: BusinessException', () => {
  const error = new Error('Some error');
  it('Should be successfully called', () => {
    const exception = new BusinessException(error);

    expect(exception.error_type).toEqual('business');
    expect(exception).toEqual(error);
  });
});
