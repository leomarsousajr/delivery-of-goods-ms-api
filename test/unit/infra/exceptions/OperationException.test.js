const OperationException = require('src/infra/exceptions/OperationException');

describe('infra :: exceptions :: OperationException', () => {
  const error = new Error('Some error');

  it('Should be successfully called', () => {
    const exception = new OperationException(error);

    expect(exception.error_type).toEqual('operation');
    expect(exception).toEqual(error);
  });
});
