const OrdersModel = require('src/infra/database/mysql/models/OrdersModel');
const { Sequelize } = require('sequelize');

describe('infra :: database :: database :: mysql :: models :: OrdersModel', () => {
  describe('#constructor', () => {
    let sut, dbConnection;

    beforeEach(() => {
      dbConnection = { connection: { define: jest.fn() } };
      sut = new OrdersModel({ dbConnection });
    });

    it('Should be instance constructor', () => {
      expect(sut).toBeInstanceOf(OrdersModel);
      expect(sut.tableName).toEqual('orders');
      expect(sut.dbConnection).toEqual(dbConnection);
      expect(sut.schema).toEqual(null);
      expect(sut.createSchema).toBeFunction();
      expect(sut.getSchema).toBeFunction();
      expect(sut.sync).toBeFunction();
    });
  });
  describe('#createSchema', () => {
    let sut, dbConnection;

    beforeEach(() => {
      dbConnection = { connection: { define: jest.fn().mockReturnValue({ sucess: true }) } };
      sut = new OrdersModel({ dbConnection });
    });

    it('Should be instance constructor', () => {
      sut.createSchema();
      expect(dbConnection.connection.define).toHaveBeenCalledExactlyOnceWith(
        'orders',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true
          },
          client_name: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          date: {
            type: Sequelize.DATE,
            allowNull: false
          },
          longitude: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          latitude: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          deleted_at: {
            type: Sequelize.DATE,
            allowNull: true
          }
        },
        {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: 'deleted_at',
          paranoid: true,
          indexes: [
            {
              unique: true,
              fields: ['uuid']
            }
          ]
        }
      );
    });
  });
  describe('#getSchema', () => {
    let sut, dbConnection;

    beforeEach(() => {
      dbConnection = { connection: { define: jest.fn().mockReturnValue({ sucess: true }) } };
      sut = new OrdersModel({ dbConnection });
    });

    it('Should be instance constructor', () => {
      const output = sut.getSchema();
      expect(output).toEqual(null);
    });
  });
  describe('#sync', () => {
    let sut, dbConnection, fakeFunction;

    beforeEach(() => {
      fakeFunction = { sync: jest.fn() };
      dbConnection = { connection: { define: jest.fn().mockReturnValue(fakeFunction) } };
      sut = new OrdersModel({ dbConnection });
    });

    it('Should be instance constructor', async () => {
      sut.createSchema();
      await sut.sync({ force: true });
      expect(fakeFunction.sync).toHaveBeenCalledExactlyOnceWith({ force: true });
    });
  });
});
