const asyncMiddleware = require('src/interfaces/http/middlewares/AsyncMiddleware')();
const HealthController = require('src/interfaces/http/presentations/health/HealthController');

describe('interfaces :: http :: presentations :: health :: HealthController', () => {
  describe('#execute', () => {
    describe('#successfully', () => {
      let container;
      let params;
      let headers;
      let json;
      let status;
      let res;
      let httpConstants;
      let healthController;
      let logger;
      let ctx;
      const expected = {
        success: true
      };

      beforeEach(() => {
        json = jest.fn().mockReturnValue(expected);
        status = jest.fn().mockReturnValue({ json });
        logger = { info: jest.fn() };
        container = {
          cradle: { logger }
        };
        res = { status };
        httpConstants = { code: { OK: 200 } };
        healthController = HealthController({ httpConstants, asyncMiddleware });
        ctx = { container, params, headers, res };
      });

      it('Should be successfully called', async () => {
        const response = await healthController.execute(ctx);
        expect(logger.info).toHaveBeenCalledExactlyOnceWith('[HealthController.execute]');
        expect(status).toHaveBeenCalledOnce();
        expect(status).toHaveBeenCalledWith(httpConstants.code.OK);
        expect(json).toHaveBeenCalledOnce();
        expect(json).toHaveBeenCalledWith(expected);
        expect(response).toEqual(expected);
      });
    });
  });
});
