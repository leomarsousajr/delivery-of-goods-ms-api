/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/infra/database/mysql/repositories/OrdersRepository')} ctx.userRepository
 * @param {import('src/infra/logging/Logger')} ctx.logger
 */
module.exports = ({ ordersRepository, logger }) => ({
  execute: async (body) => {
    logger.info('[CreateOrdersService.execute]');
    return await ordersRepository.create(body);
  }
});
