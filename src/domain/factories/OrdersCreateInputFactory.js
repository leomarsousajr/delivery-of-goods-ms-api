const CapitalizeNameHelps = require('src/infra/support/helpers/CapitalizeNameHelps');

module.exports = {
  buildData: (data) => {
    return {
      ...data,
      client_name: CapitalizeNameHelps(data.client_name)
    };
  }
};
