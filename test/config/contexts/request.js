const defaults = require('superagent-defaults');
const supertest = require('supertest');

module.exports = (instance) => {
  if (instance && !global.request) {
    global.request = defaults(supertest(instance));
    global.request.trustLocalhost();
  }

  return global.request;
};
