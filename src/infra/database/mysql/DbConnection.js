const { Sequelize } = require('sequelize');

class DbConnection {
  constructor(ctx) {
    this.context = ctx;
    this.connection = null;
  }
  getModels() {
    return Object.keys(this.context)
      .filter((key) => key.includes(this.context.scopeEnum.MODEL_SUFFIX))
      .flatMap((key) => this.context[key]);
  }
  async connect({ force = false } = {}) {
    try {
      const options = {
        host: this.context.config.DB.HOST,
        dialect: 'mysql',
        logging: false,
        define: {
          underscored: true
        }
      };
      if (this.context.config.ENV === 'PROD') {
        options.ssl = false;
        options.dialectOptions = {
          ssl: {
            require: false
          }
        };
      }
      this.connection = new Sequelize(
        this.context.config.DB.DATABASE,
        this.context.config.DB.USER,
        this.context.config.DB.PASSWORD,
        options
      );
      await this.connection.authenticate();
      await this.buildSchemas(force);
      this.context.logger.info('[MysqlConnection.connect] Connection has been established successfully.');
    } catch (error) {
      this.context.logger.error('[MysqlConnection.connect] Unable to connect to the database:', error);
    }
  }
  async buildSchemas(force) {
    const models = this.getModels();
    for (const model of models) {
      model.createSchema();
      if (this.context.config.ENV != 'PROD') {
        await this.syncronization(model, force);
      }
    }
  }
  async syncronization(model, force) {
    this.context.logger.info(`[MysqlConnection.syncronization] model: ${model.tableName} | force: ${force}`);
    await model.sync({ force });
  }
  getConnection() {
    return this.connection;
  }
}

module.exports = DbConnection;
