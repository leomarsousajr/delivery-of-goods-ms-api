const Logger = require('src/infra/logging/Logger');

require('dotenv').config();

module.exports = class ConfigLoader {
  constructor(configs) {
    this.configs = configs ? configs : {};
    this.client = null;
  }
  async loadEnvironment() {
    Logger.info('[Config.loadEnvironment] configuration based env:', process.env.NODE_ENV);
    let configs = {};
    switch (process.env.NODE_ENV) {
      case 'LOCAL':
        configs = require('./properties/env/local');
        break;
      case 'TEST':
        configs = require('./properties/env/test');
        break;
    }
    this.configs = configs;
    return this;
  }
  async setEnvironment() {
    Logger.info('[Config.setEnvironment]', 'Setup started');
    for (let config in this.configs) {
      if (process.env[config]) {
        Logger.fatal(
          '[Config.setEnvironment]',
          `Config with key name ${config} and value: ${process.env[config]} in process.env exists`
        );
        throw new Error(`Config with key name ${process.env[config]} in process.env exists`);
      }
      process.env[config] = this.configs[config];
    }
  }
};
