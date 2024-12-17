const OrdersCreateInputFactory = require('src/domain/factories/OrdersCreateInputFactory');

describe('domain :: factories :: OrdersCreateInputFactory', () => {
  describe('#buildData', () => {
    it('should transform the data correctly', () => {
      const input = {
        client_name: 'John doe',
        longitude: '-123.456',
        latitude: '-123.456'
      };

      const expectedOutputClientName = 'John Doe';

      const result = OrdersCreateInputFactory.buildData(input);

      expect(result.client_name).toEqual(expectedOutputClientName);
      expect(result.longitude).toEqual(input.longitude);
      expect(result.latitude).toEqual(input.latitude);
    });
  });
});
