const database = require('test/config/contexts/database');

beforeEach(async () => {
  await database().clear();
});

afterAll(async () => {
  await database().clear();
});
