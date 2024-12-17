const { scopePerRequest } = require('awilix-express');
const express = require('express');
const noCache = require('nocache');
const helmet = require('helmet');
const http = require('http');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/domain/factories/global/LogFactory')} ctx.logFactory
 * @param {import('src/infra/logging/Logger')} ctx.logger
 * @param {import('src/interfaces/http/Router')} ctx.router
 * @param {import('src/Container')} ctx.container
 */
module.exports = class Server {
  constructor({ logFactory, logger, router, container, config }) {
    this.logFactory = logFactory;
    this.logger = logger;
    this.config = config;
    this.express = express();
    this.express.use(helmet());
    this.express.use(noCache());
    this.express.use(scopePerRequest(container));
    this.express.use(router);
  }

  async init() {
    return http.createServer(this.express).listen(this.config.PORT, () => {
      this.logger.info(this.logFactory.serverInfo(process.pid, this.config.PORT));
    });
  }
};
