const CreateOrdersOperation = require('src/app/operations/orders/CreateOrdersOperation');
const OrdersCreateInputFactory = require('src/domain/factories/OrdersCreateInputFactory');

describe('app :: operations :: orders :: CreateOrdersOperation', () => {
  const spyLogger = {};
  const spyCreateOrdersService = {};

  beforeEach(() => {
    spyLogger.info = jest.fn();
    spyLogger.error = jest.fn(); // Caso você precise rastrear erros futuramente

    spyCreateOrdersService.execute = jest.fn().mockResolvedValue({ orderId: 123 });
  });

  describe('#execute', () => {
    let sut;
    let ctx;

    beforeEach(() => {
      ctx = {
        logger: spyLogger,
        createOrdersService: spyCreateOrdersService
      };

      sut = CreateOrdersOperation(ctx);
    });

    it('should log the operation and call createOrdersService with transformed input', async () => {
      const mockBody = { client_name: 'John Doe' };
      const transformedInput = { transformed: 'input' }; // Simulando o que o `buildData` retorna

      jest.spyOn(OrdersCreateInputFactory, 'buildData').mockReturnValue(transformedInput);

      const output = await sut.execute(mockBody);

      expect(spyLogger.info).toHaveBeenCalledExactlyOnceWith('[CreateOrdersOperation.execute]');
      expect(spyLogger.error).not.toHaveBeenCalled();

      expect(OrdersCreateInputFactory.buildData).toHaveBeenCalledExactlyOnceWith(mockBody);

      expect(spyCreateOrdersService.execute).toHaveBeenCalledExactlyOnceWith(transformedInput);

      expect(output).toEqual({ orderId: 123 });
    });
  });
});
