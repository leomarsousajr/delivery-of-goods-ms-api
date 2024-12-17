const IntegrationException = require('src/infra/exceptions/IntegrationException');

describe('infra :: exceptions :: IntegrationException', () => {
  const error = new Error('Some error');

  it('Should be successfully called', () => {
    const exception = new IntegrationException(error);

    expect(exception.error_type).toEqual('integration');
    expect(exception).toEqual(error);
  });
});
