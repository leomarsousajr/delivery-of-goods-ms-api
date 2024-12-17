const { Sequelize } = require('sequelize');

class OrdersModel {
  constructor({ dbConnection }) {
    this.tableName = 'orders';
    this.dbConnection = dbConnection;
    this.schema = null;
  }

  createSchema() {
    this.schema = this.dbConnection.connection.define(
      this.tableName,
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
        paranoid: true, // This will add the 'deleted_at' column and enable soft deletes
        indexes: [
          {
            unique: true,
            fields: ['uuid']
          }
        ]
      }
    );
  }

  getSchema() {
    return this.schema;
  }

  async sync({ force }) {
    await this.schema.sync({ force });
  }
}

module.exports = OrdersModel;
