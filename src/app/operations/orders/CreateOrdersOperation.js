const OrdersCreateInputFactory = require('src/domain/factories/OrdersCreateInputFactory');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/services/orders/CreateOrdersService')} ctx.createOrdersService
 * @param {import('src/infra/logging/Logger')} ctx.logger
 */
module.exports = ({ logger, createOrdersService }) => ({
  execute: async (body) => {
    logger.info('[CreateOrdersOperation.execute]');
    return await createOrdersService.execute(OrdersCreateInputFactory.buildData(body));
  }
});
