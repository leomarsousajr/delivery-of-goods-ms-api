const NotFoundException = require('src/infra/exceptions/NotFoundException');

describe('infra :: exceptions :: NotFoundException', () => {
  const error = new Error('Some error');

  it('Should be successfully called', () => {
    const exception = new NotFoundException(error);

    expect(exception.error_type).toEqual('notFound');
    expect(exception).toEqual(error);
  });
});
