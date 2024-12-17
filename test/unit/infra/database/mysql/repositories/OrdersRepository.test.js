const OrdersRepository = require('src/infra/database/mysql/repositories/OrdersRepository');
const { Op } = require('sequelize');

describe('infra :: database :: mysql :: repositories :: OrdersRepository', () => {
  describe('#constructor', () => {
    let logger, sut, dbConnection;

    beforeEach(() => {
      logger = { info: jest.fn() };
      dbConnection = { connection: { models: { orders: { success: true } } } };
      sut = new OrdersRepository({ logger, dbConnection });
    });

    it('Should be successfully called', () => {
      expect(sut).toBeInstanceOf(OrdersRepository);
      expect(sut.query).toEqual({ success: true });
      expect(sut.findAll).toBeFunction();
      expect(sut.create).toBeFunction();
    });
  });
  describe('#findAll', () => {
    describe('#When search is not defined', () => {
      let logger, sut, dbConnection;

      beforeEach(() => {
        logger = { info: jest.fn() };
        dbConnection = {
          connection: {
            models: {
              orders: {
                count: jest.fn().mockReturnValue(10),
                findAndCountAll: jest.fn().mockReturnValue({ data: [1, 2, 3] })
              }
            }
          }
        };
        sut = new OrdersRepository({ logger, dbConnection });
      });

      it('Should be successfully called', async () => {
        const output = await sut.findAll();
        expect(logger.info).toHaveBeenCalledExactlyOnceWith('[OrdersRepository.findAll]');
        expect(dbConnection.connection.models['orders'].count).toHaveBeenCalledExactlyOnceWith();
        expect(dbConnection.connection.models['orders'].findAndCountAll).toHaveBeenCalledExactlyOnceWith({
          where: {},
          limit: 100,
          offset: 0,
          order: [['created_at', 'DESC']]
        });
        expect(output).toEqual({ total: 10, limit: 100, offset: 0, data: [1, 2, 3] });
      });
    });
    describe('#When search is defined', () => {
      let logger, sut, dbConnection;

      beforeEach(() => {
        logger = { info: jest.fn() };
        dbConnection = {
          connection: {
            models: {
              orders: {
                count: jest.fn().mockReturnValue(10),
                findAndCountAll: jest.fn().mockReturnValue({ data: [1, 2, 3] })
              }
            }
          }
        };
        sut = new OrdersRepository({ logger, dbConnection });
      });

      it('Should be successfully called', async () => {
        const output = await sut.findAll({ search: 'John doe' });
        expect(logger.info).toHaveBeenCalledExactlyOnceWith('[OrdersRepository.findAll]');
        expect(dbConnection.connection.models['orders'].count).toHaveBeenCalledExactlyOnceWith();
        expect(dbConnection.connection.models['orders'].findAndCountAll).toHaveBeenCalledExactlyOnceWith({
          where: {
            [Op.or]: [{ client_name: { [Op.like]: '%John doe%' } }]
          },
          limit: 100,
          offset: 0,
          order: [['created_at', 'DESC']]
        });
        expect(output).toEqual({ total: 10, limit: 100, offset: 0, data: [1, 2, 3] });
      });
    });
  });
  describe('#create', () => {
    describe('#successfully', () => {
      let logger, sut, dbConnection, input;

      beforeEach(() => {
        logger = { info: jest.fn() };
        dbConnection = {
          connection: { models: { orders: { create: jest.fn().mockReturnValue({ custom: 'property' }) } } }
        };
        sut = new OrdersRepository({ logger, dbConnection });
        input = { client_name: 'John doe' };
      });

      it('Should be successfully called', async () => {
        const output = await sut.create(input);
        expect(logger.info).toHaveBeenCalledExactlyOnceWith('[OrdersRepository.create]');
        expect(dbConnection.connection.models['orders'].create).toHaveBeenCalledExactlyOnceWith({
          client_name: 'John doe'
        });
        expect(output).toEqual({ custom: 'property' });
      });
    });
  });
});
