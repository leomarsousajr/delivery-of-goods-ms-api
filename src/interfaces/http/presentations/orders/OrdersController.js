/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/constants/HttpConstants')} ctx.httpConstants
 * @param {import('src/interfaces/http/middlewares/AsyncMiddleware')} ctx.asyncMiddleware
 */
module.exports = ({ httpConstants, asyncMiddleware }) => ({
  create: asyncMiddleware(async (ctx) => {
    const { body, container, res } = ctx;
    const { createOrdersOperation, logger } = container.cradle;
    logger.info('[OrdersController.create]');
    const output = await createOrdersOperation.execute(body);
    return res.status(httpConstants.code.CREATED).json(output);
  }),
  findAll: asyncMiddleware(async (ctx) => {
    const { query, container, res } = ctx;
    const { ordersSerializer, findAllOrdersOperation, logger } = container.cradle;
    logger.info('[OrdersController.findAll]', query);
    const output = await findAllOrdersOperation.execute(query);
    const serialized = ordersSerializer.paginatedSerialize(output);
    return res.status(httpConstants.code.OK).json(serialized);
  })
});
