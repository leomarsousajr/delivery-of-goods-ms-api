const AuthorizationException = require('src/infra/exceptions/AuthorizationException');

describe('infra :: exceptions :: AuthorizationException', () => {
  const error = new Error('Some error');

  it('Should be successfully called', () => {
    const exception = new AuthorizationException(error);

    expect(exception.error_type).toEqual('authorization');
    expect(exception).toEqual(error);
  });

  it('Should be successfully called message default', () => {
    const exception = new AuthorizationException();

    expect(exception.error_type).toEqual('authorization');
    expect(exception).toEqual(new Error('Unauthorized access'));
  });
});
