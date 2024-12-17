const errorSchema = require('src/interfaces/http/schemas/global/ErrorSchema')();
const OrdersSchema = require('src/interfaces/http/schemas/orders/OrdersSchema');
const { generateOrdersPayload } = require('test/support/factories/orders/OrdersPayload');

describe('interfaces :: http :: schemas :: orders :: OrdersSchema', () => {
  let sut;
  beforeEach(() => {
    sut = OrdersSchema({ errorSchema });
  });
  describe('#body', () => {
    describe('When the method receives all the necessary attributes', () => {
      it('Should be successfully called', () => {
        const data = generateOrdersPayload();
        console.log('data', data);
        const result = sut.body.validate(data);
        expect(result.error).toBeUndefined();
      });
    });
    describe('When the method does not receive all the necessary attributes', () => {
      it('Should be successfully called', () => {
        const data = {};
        const result = sut.body.validate(data);
        expect(result.error).toBeDefined();
      });
    });
  });
  describe('#400', () => {
    describe('When the method receives all the necessary attributes', () => {
      it('Should be successfully called', () => {
        const data = { error_code: '1-400', message: 'Bad Request', details: [] };
        const result = sut.responses[400].validate(data);
        expect(result.error).toBeUndefined();
      });
    });
    describe('When the method does not receive all the necessary attributes', () => {
      it('Should be called and return an error', () => {
        const data = {};
        const result = sut.responses[400].validate(data);
        expect(result.error).not.toBeUndefined();
      });
    });
  });
});
