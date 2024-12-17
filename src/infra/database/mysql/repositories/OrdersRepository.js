const { Op } = require('sequelize');

class OrdersRepository {
  constructor({ dbConnection, logger }) {
    this.logger = logger;
    this.query = dbConnection.connection.models['orders'];
  }

  async findAll({ limit = 100, offset = 0, sort = 'DESC', search = '' } = {}) {
    this.logger.info('[OrdersRepository.findAll]');
    const total = await this.query.count();
    let whereCondition = {};
    if (search) {
      whereCondition = {
        [Op.or]: [{ client_name: { [Op.like]: `%${search}%` } }]
      };
    }
    const query = await this.query.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['created_at', sort]]
    });
    return { total, limit, offset, ...query };
  }
  async create(orders) {
    this.logger.info('[OrdersRepository.create]');
    return this.query.create(orders);
  }
}

module.exports = OrdersRepository;
