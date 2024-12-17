const { Router } = require('express');
/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/middlewares/ValidatorMiddleware')} ctx.validatorMiddleware
 */
module.exports = ({ logger, validatorMiddleware }) => ({
  register: (routes) => {
    const router = Router();
    for (const { method, path, validation, middlewares, handler } of routes) {
      const validator = validatorMiddleware.validate(validation);
      logger.info(`[API-ROUTE] [${method.toUpperCase()}] PATH: /api${path}`);
      if (middlewares) {
        router[method](path, middlewares, validator, handler);
        continue;
      }
      router[method](path, validator, handler);
    }
    return router;
  }
});
