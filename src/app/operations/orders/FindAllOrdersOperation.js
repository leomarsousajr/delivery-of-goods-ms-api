/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/app/services/')} ctx.findAllOrdersService
 * @param {import('src/infra/logging/Logger')} ctx.logger
 */
module.exports = ({ findAllOrdersService, logger }) => ({
  execute: async (query) => {
    logger.info('[FindAllOrdersOperation.execute]');
    return await findAllOrdersService.execute(query);
  }
});
