const ConfigLoader = require('config/ConfigLoader');
const Container = require('src/Container');

module.exports = class {
  constructor() {
    this.instance = null;
    this.container = new Container();
    this.envs = new ConfigLoader();
  }

  async loadSetup() {
    await this.envs.loadEnvironment();
    await this.envs.setEnvironment();
    this.instance = this.container.configureContainer(this.envs.configs);
    return this;
  }

  async start() {
    if (!this.instance) {
      throw new Error('Error container instance not started!');
    }

    await this.instance.cradle.dbConnection.connect({ force: true });
    await this.instance.cradle.server.init();
    await this.instance.cradle.openApi.init({ openapi: true });
  }
};
