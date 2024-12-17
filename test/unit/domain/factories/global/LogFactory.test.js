const logFactory = require('src/domain/factories/global/LogFactory')();

describe('domain :: factories :: global :: LogFactory', () => {
  describe('#serverInfo', () => {
    const pid = 1;
    const port = 8081;

    it('Should be successfully called', () => {
      const expected = '[pid 1] Listering at port: 8081';
      const result = logFactory.serverInfo(pid, port);

      expect(result).toEqual(expected);
    });
  });
});
