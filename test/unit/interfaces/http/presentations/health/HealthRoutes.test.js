const HealthRoutes = require('src/interfaces/http/presentations/health/HealthRoutes');

describe('interfaces :: http :: presentations :: health :: HealthRoutes', () => {
  let healthController, httpConstants;

  beforeEach(() => {
    healthController = { execute: jest.fn() };
    httpConstants = { code: { OK: 200, BAD_REQUEST: 400 } };
  });

  it('Should be successfully called', () => {
    const result = HealthRoutes({ healthController, httpConstants });

    expect(result).toBeArray();
    expect(result).toHaveLength(1);
  });
});
