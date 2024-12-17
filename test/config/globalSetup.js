const Application = require('src/app/Application');

const request = require('test/config/contexts/request');
const database = require('test/config/contexts/database');

module.exports = async () => {
  const application = new Application();

  await application.loadSetup();
  await application.start();

  const { server, dbConnection } = application.instance.cradle;
  request(server.express);
  database(dbConnection);
};
