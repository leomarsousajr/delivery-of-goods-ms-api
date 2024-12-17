const asyncMiddleware = require('src/interfaces/http/middlewares/AsyncMiddleware')();
const OrdersController = require('src/interfaces/http/presentations/orders/OrdersController');
const { generateOrdersPayload } = require('test/support/factories/orders/OrdersPayload');

describe('interfaces :: http :: presentations :: orders :: OrdersController', () => {
  describe('#create', () => {
    describe('#successfully', () => {
      let container;
      let body;
      let headers;
      let json;
      let status;
      let res;
      let httpConstants;
      let ordersController;
      let createOrdersOperation;
      let logger;
      let ctx;
      const expected = {
        success: true
      };

      beforeEach(() => {
        body = generateOrdersPayload();
        headers = { 'x-partner-id': 'partner_id' };
        json = jest.fn().mockReturnValue(expected);
        status = jest.fn().mockReturnValue({ json });
        createOrdersOperation = { execute: jest.fn().mockReturnValue(expected) };
        logger = { info: jest.fn() };
        container = {
          cradle: { createOrdersOperation, logger }
        };
        res = { status };
        httpConstants = { code: { OK: 200 } };
        ordersController = OrdersController({ httpConstants, asyncMiddleware });
        ctx = { container, body, headers, res };
      });

      it('Should be successfully called', async () => {
        const response = await ordersController.create(ctx);
        expect(logger.info).toHaveBeenCalledExactlyOnceWith('[OrdersController.create]');
        expect(createOrdersOperation.execute).toHaveBeenCalledExactlyOnceWith(body);
        expect(status).toHaveBeenCalledOnce();
        expect(status).toHaveBeenCalledWith(httpConstants.code.CREATED);
        expect(json).toHaveBeenCalledOnce();
        expect(json).toHaveBeenCalledWith(expected);
        expect(response).toEqual(expected);
      });
    });
  });
  describe('#findAll', () => {
    describe('#successfully', () => {
      let container;
      let query;
      let headers;
      let json;
      let status;
      let res;
      let httpConstants;
      let ordersSerializer;
      let findAllOrdersOperation;
      let ordersController;
      let logger;
      let ctx;
      const expected = {
        success: true
      };

      beforeEach(() => {
        query = { limit: 10, offset: 0 };
        headers = { 'x-partner-id': 'partner_id' };
        json = jest.fn().mockReturnValue(expected);
        status = jest.fn().mockReturnValue({ json });
        findAllOrdersOperation = { execute: jest.fn().mockReturnValue({ custom: 'property' }) };
        ordersSerializer = { paginatedSerialize: jest.fn().mockReturnValue(expected) };
        logger = { info: jest.fn() };
        container = {
          cradle: { findAllOrdersOperation, ordersSerializer, logger }
        };
        res = { status };
        httpConstants = { code: { OK: 200 } };
        ordersController = OrdersController({ httpConstants, asyncMiddleware });
        ctx = { container, query, headers, res };
      });

      it('Should be successfully called', async () => {
        const response = await ordersController.findAll(ctx);
        expect(logger.info).toHaveBeenCalledExactlyOnceWith('[OrdersController.findAll]', query);
        expect(findAllOrdersOperation.execute).toHaveBeenCalledExactlyOnceWith(query);
        expect(ordersSerializer.paginatedSerialize).toHaveBeenCalledExactlyOnceWith({ custom: 'property' });
        expect(status).toHaveBeenCalledOnce();
        expect(status).toHaveBeenCalledWith(httpConstants.code.OK);
        expect(json).toHaveBeenCalledOnce();
        expect(json).toHaveBeenCalledWith(expected);
        expect(response).toEqual(expected);
      });
    });
  });
});
