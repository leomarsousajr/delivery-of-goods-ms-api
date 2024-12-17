const exceptionEnum = require('src/domain/enums/global/ExceptionEnum')();

describe('domain :: enums :: global :: ExceptionEnum', () => {
  describe('#values', () => {
    it('Should return enum values', () => {
      const expected = [
        'internalError',
        'contract',
        'authorization',
        'notFound',
        'business',
        'operation',
        'integration',
        'timeout'
      ];
      const result = exceptionEnum.values();

      expect(result).toHaveLength(8);
      expect(result).toEqual(expected);
    });
  });

  describe('#keys', () => {
    it('Should return enum keys', () => {
      const expected = [
        'INTERNAL_ERROR',
        'CONTRACT',
        'AUTHORIZATION',
        'NOT_FOUND',
        'BUSINESS',
        'OPERATION',
        'INTEGRATION',
        'TIMEOUT'
      ];
      const result = exceptionEnum.keys();

      expect(result).toHaveLength(8);
      expect(result).toEqual(expected);
    });
  });

  describe('#key', () => {
    it('Should return enum key', () => {
      const expected = 'CONTRACT';
      const result = exceptionEnum.key('contract');

      expect(result).toEqual(expected);
    });
  });
});
