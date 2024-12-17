const CreateOrdersOperation = require('src/app/operations/orders/CreateOrdersOperation');
const { generateOrdersPayload } = require('test/support/factories/orders/OrdersPayload');
const OrdersCreateInputFactory = require('src/domain/factories/OrdersCreateInputFactory');

jest.mock('src/domain/factories/OrdersCreateInputFactory');

describe('app :: operations :: orders :: CreateOrdersOperation', () => {
  let spyLogger;
  let ctx;
  let sut;

  beforeEach(() => {
    spyLogger = {
      info: jest.fn(),
      error: jest.fn()
    };

    ctx = {
      logger: spyLogger,
      createOrdersService: {
        execute: jest.fn().mockResolvedValue({ custom: 'property' })
      }
    };

    sut = CreateOrdersOperation(ctx);
  });

  describe('#execute', () => {
    it('should return orders entity to serialize', async () => {
      const body = generateOrdersPayload();
      const builtData = {};

      OrdersCreateInputFactory.buildData.mockReturnValue(builtData);

      const output = await sut.execute(body);

      expect(spyLogger.info).toHaveBeenCalledWith('[CreateOrdersOperation.execute]');
      expect(spyLogger.error).not.toHaveBeenCalled();

      expect(output).toEqual({ custom: 'property' });

      expect(ctx.createOrdersService.execute).toHaveBeenCalledWith(builtData);
    });
  });
});
