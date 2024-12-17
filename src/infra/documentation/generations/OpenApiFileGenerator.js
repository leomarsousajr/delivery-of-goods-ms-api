const { ROUTE_SUFFIX, OPENAPI_PATH } = require('src/infra/documentation/enums/OpenApiEnum');
const { generateSwagger } = require('src/infra/documentation/generations/SwaggerDocsGenerator');
const { mkdirSync, writeFileSync } = require('fs');
const { dirname } = require('path');

module.exports = (ctx) => ({
  init: (config) => {
    try {
      const routes = Object.keys(ctx)
        .filter((key) => key.includes(ROUTE_SUFFIX) && Array.isArray(ctx[key]))
        .flatMap((key) => ctx[key]);
      const options = {
        title: config?.title ?? ctx.config.packageJson?.name ?? ctx.config.info?.serviceName,
        version: config?.version ?? ctx.config.packageJson?.version ?? ctx.config.info?.version,
        description: config?.description ?? ctx.config.packageJson?.description ?? ctx.config.info?.serviceLabel,
        externalDocs: config?.externalDocs,
        basePath: config?.basePath ?? ctx.config.info?.basePath,
        schemes: config?.schemes ?? ctx.config.info?.defaultProtocols,
        openapi: config?.openapi,
        productAcronym: config?.productAcronym ?? ctx.config.info?.productAcronym,
        dnsDomain: config?.dnsDomain ?? ctx.config.info?.dnsDomain
      };
      const openapiDoc = generateSwagger(routes, options, ctx.config.ENV?.valueOf());

      mkdirSync(dirname(OPENAPI_PATH), { recursive: true });
      writeFileSync(OPENAPI_PATH, JSON.stringify(openapiDoc, null, 2));
      ctx.logger.info('[OpenapiFileGenerator] OpenAPI doc successfully generated');
    } catch (error) {
      ctx.logger.error('[OpenapiFileGenerator]', error.message);
    }
  }
});
