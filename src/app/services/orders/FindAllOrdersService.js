/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/database/mysql/repositories/OrdersRepository')} ctx.ordersRepository
 * @param {import('src/infra/logging/Logger')} ctx.logger
 */
module.exports = ({ ordersRepository, logger }) => ({
  execute: async (query) => {
    logger.info('[FindAllOrdersService.execute]');
    return await ordersRepository.findAll(query);
  }
});
