const OrdersSerializer = require('src/interfaces/http/presentations/orders/OrdersSerializer');
const { generateOrdersDatabase } = require('test/support/factories/orders/OrdersPayload');

describe('interfaces :: http :: presentations :: authorization :: OrdersSerializer', () => {
  describe('#paginatedSerialize', () => {
    let sut, data, input;

    beforeEach(() => {
      sut = OrdersSerializer();
      data = [generateOrdersDatabase(), generateOrdersDatabase()];
      input = { limit: 100, count: 2, rows: data, total: 10, offset: 0 };
    });

    it('Should be successfully called', () => {
      const result = sut.paginatedSerialize(input);
      expect(result).toEqual({
        data,
        limit: input.limit,
        offset: input.offset,
        total_founded: input.count,
        total: input.total
      });
      expect(result.data).toBeArray();
      expect(result.data).toHaveLength(2);
    });
  });
});
