/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('src/interfaces/http/presentations/health/HealthController')} ctx.healthController
 * @param {import('src/domain/constants/HttpConstants')} ctx.httpConstants
 */
module.exports = ({ healthController, httpConstants }) => [
  {
    method: 'get',
    path: '/health',
    handler: healthController.execute,
    validation: {},
    responses: {
      [httpConstants.code.OK]: {
        description: 'Successful operation'
      },
      [httpConstants.code.BAD_REQUEST]: {
        description: 'Failed validation'
      }
    },
    description: 'Health check',
    summary: 'Health check',
    tags: ['Health']
  }
];
