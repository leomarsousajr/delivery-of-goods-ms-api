module.exports = (dbConnection) => {
  if (dbConnection && !global.provider) {
    global.provider = dbConnection;
  }
  return {
    clear: async () => {
      for (const model in global.provider.connection.models) {
        await global.provider.connection.models[model].destroy({
          where: {},
          truncate: true,
          force: true
        });
      }
    },
    query: async (table, options) => {
      return await global.provider.connection.models[table].findAll(options);
    },
    insert: async (table, data) => {
      return await global.provider.connection.models[table].create(data);
    }
  };
};
