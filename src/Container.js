const { createContainer, asClass, asFunction, asValue, InjectionMode } = require('awilix');

const Router = require('src/interfaces/http/Router');
const Server = require('src/interfaces/http/Server');
const DbConnection = require('src/infra/database/mysql/DbConnection');
const Logger = require('src/infra/logging/Logger');
const httpConstants = require('src/domain/constants/HttpConstants');
const { openApiFileGenerator, openApiMiddleware } = require('src/infra/documentation');
module.exports = class Container {
  constructor() {
    this.instance = createContainer();
  }
  configureContainer(config) {
    this.instance
      .register({
        server: asClass(Server).singleton(),
        dbConnection: asClass(DbConnection).singleton(),
        container: asValue(this.instance),
        logger: asValue(Logger),
        router: asFunction(Router),
        config: asValue(config),
        httpConstants: asValue(httpConstants),
        openApi: asFunction(openApiFileGenerator).singleton(),
        openApiMiddleware: asFunction(openApiMiddleware).singleton()
      })
      .loadModules(
        [
          'src/app/operations/**/*.js',
          'src/app/repositories/**/*.js',
          'src/app/services/**/*.js',
          'src/domain/enums/**/*.js',
          'src/domain/factories/**/*.js',
          'src/domain/schemas/**/*.js',
          'src/infra/database/mysql/repositories/**/*.js',
          'src/infra/database/mysql/models/**/*.js',
          'src/infra/integrations/**/*.js',
          'src/infra/support/**/*.js',
          'src/infra/logging/**/*.js',
          'src/interfaces/http/errors/**/*.js',
          'src/interfaces/http/middlewares/**/*.js',
          'src/interfaces/http/presentations/**/*.js',
          'src/interfaces/http/schemas/**/*.js',
          'src/interfaces/http/RouterRegister.js'
        ],
        {
          formatName: 'camelCase',
          resolverOptions: {
            injectionMode: InjectionMode.PROXY
          }
        }
      );
    return this.instance;
  }
};
