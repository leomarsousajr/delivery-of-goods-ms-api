const ContractException = require('src/infra/exceptions/ContractException');

describe('infra :: exceptions :: ContractException', () => {
  describe('When the error has details', () => {
    const error = Object.assign(new Error('Some error'), { details: [] });

    it('Should be successfully called', () => {
      const exception = new ContractException(error);

      expect(exception.error_type).toEqual('contract');
      expect(exception.details).toEqual([]);
      expect(exception).toEqual(error);
    });
  });

  describe('When the error has no details', () => {
    const error = new Error('Some error');

    it('Should be successfully called', () => {
      const exception = new ContractException(error);

      expect(exception.error_type).toEqual('contract');
      expect(exception.details).toBeUndefined();
      expect(exception).toEqual(error);
    });
  });
});
