const dataFaker = require('test/support/dataFaker');

const generateOrdersPayload = () => {
  return {
    client_name: dataFaker.name().toUpperCase(),
    date: dataFaker.date().toISOString(),
    longitude: String(dataFaker.longitude()),
    latitude: String(dataFaker.latitude())
  };
};
const generateOrdersDatabase = () => {
  return {
    uuid: dataFaker.guid({ version: 4 }),
    client_name: dataFaker.name().toUpperCase(),
    date: dataFaker.date().toISOString(),
    longitude: String(dataFaker.longitude()),
    latitude: String(dataFaker.latitude()),
    deleted_at: null,
    created_at: dataFaker.date().toISOString(),
    updated_at: dataFaker.date().toISOString()
  };
};

module.exports = { generateOrdersPayload, generateOrdersDatabase };
