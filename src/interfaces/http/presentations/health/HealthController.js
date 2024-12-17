/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/constants/HttpConstants')} ctx.httpConstants
 * @param {import('src/interfaces/http/middlewares/AsyncMiddleware')} ctx.asyncMiddleware
 */
module.exports = ({ httpConstants, asyncMiddleware }) => ({
  execute: asyncMiddleware(async (ctx) => {
    const { container, res } = ctx;
    const { logger } = container.cradle;
    logger.info('[HealthController.execute]');
    return res.status(httpConstants.code.OK).json({ success: true });
  })
});
