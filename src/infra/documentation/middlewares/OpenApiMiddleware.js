const { OPENAPI_PATH } = require('src/infra/documentation/enums/OpenApiEnum');
const { buildRuntimeUrl } = require('src/infra/documentation/generations/SwaggerDocsGenerator');
const swaggerUi = require('swagger-ui-express');
const { readFileSync } = require('fs');

module.exports = (ctx) => {
  try {
    const openapiDoc = readFileSync(OPENAPI_PATH);
    return [swaggerUi.serve, swaggerUi.setup(buildRuntimeUrl(openapiDoc, ctx.config.ENV, ctx.config.PORT))];
  } catch {
    return [swaggerUi.serve, swaggerUi.setup({ swagger: '2.0' })];
  }
};
