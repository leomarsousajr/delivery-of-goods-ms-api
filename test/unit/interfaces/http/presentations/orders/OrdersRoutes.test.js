const OrdersRoutes = require('src/interfaces/http/presentations/orders/OrdersRoutes');

describe('interfaces :: http :: presentations :: OrdersRoutes', () => {
  let ordersController, httpConstants, ordersSchema;

  beforeEach(() => {
    ordersController = { execute: jest.fn() };
    httpConstants = { code: { OK: 200, BAD_REQUEST: 400 } };
    ordersSchema = { body: {}, query: {}, responses: { 400: {} } };
  });

  it('Should be successfully called', () => {
    const result = OrdersRoutes({ ordersController, httpConstants, ordersSchema });

    expect(result).toBeArray();
    expect(result).toHaveLength(2);
  });
});
