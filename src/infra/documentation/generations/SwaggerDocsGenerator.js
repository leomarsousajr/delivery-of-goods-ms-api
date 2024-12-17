const swaggerJsdoc = require('swagger-jsdoc');
const { parseJoiSchema } = require('src/infra/documentation/utils/JoiToSwagger');
const defaultOptions = {
  title: 'API swagger',
  version: 'v1',
  description: 'Auto generated api swagger',
  basePath: 'api',
  schemes: ['http'],
  openapi: false,
  externalDocs: {
    description: '⚠️ All examples of implementations are here ⚠️',
    url: ''
  },
  productAcronym: 'dso',
  dnsDomain: 'app.$env.gms.corp'
};

const securityScheme = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer'
  }
};

const parseValidation = {
  body: (item, openapi) => {
    if (openapi === false) {
      return [
        {
          in: item.type,
          required: true,
          name: item.type,
          schema: parseJoiSchema(item.parameter).swagger
        }
      ];
    } else {
      return {
        schema: parseJoiSchema(item.parameter).swagger
      };
    }
  },

  formData: (item, openapi) => {
    const { properties, required } = parseJoiSchema(item.parameter).swagger;
    return Object.keys(properties).map((propertyKey) => {
      return {
        name: propertyKey,
        in: 'formData',
        required: required && required.includes(propertyKey),
        ...buildType(openapi, propertyKey === 'file' ? 'file' : properties[propertyKey].type),
        description: properties[propertyKey].description
      };
    });
  },

  query: (item, openapi) => {
    const { properties, required } = parseJoiSchema(item.parameter).swagger;
    return Object.keys(properties).map((propertyKey) => {
      return {
        name: propertyKey,
        in: item.type,
        required: required && required.includes(propertyKey),
        ...buildType(openapi, properties[propertyKey].type),
        description: properties[propertyKey].description
      };
    });
  },
  params: (item, openapi) => {
    const { properties } = parseJoiSchema(item.parameter).swagger;
    return Object.keys(properties).map((propertyKey) => {
      return {
        name: propertyKey,
        in: 'path',
        required: true,
        ...buildType(openapi, properties[propertyKey].type),
        description: properties[propertyKey].description
      };
    });
  },
  headers: (item, openapi) => {
    const { properties, required } = parseJoiSchema(item.parameter).swagger;
    return Object.keys(properties).map((propertyKey) => {
      return {
        name: propertyKey,
        in: 'header',
        required: required && required.includes(propertyKey),
        ...buildType(openapi, properties[propertyKey].type),
        description: properties[propertyKey].description
      };
    });
  }
};

const buildType = (openapi, type) => {
  if (openapi === '3.0.0') {
    return {
      schema: {
        type
      }
    };
  } else {
    return {
      type
    };
  }
};

const parseParameters = (arrParameters, openapi) => {
  let parameters = [];

  arrParameters.forEach((item) => {
    parameters = parameters.concat(parseValidation[item.type](item, openapi));
  });

  return parameters;
};

const parseSwaggerResponse = (content) => {
  if (content.schema) {
    content.schema = parseJoiSchema(content.schema).swagger;
  }

  return content;
};

const parseOpenApiResponse = (response, produces) => {
  if (!response.content) {
    let joiSchema = response.schema;
    if (joiSchema) {
      let newResponse = {
        description: response.description,
        content: {}
      };
      produces.forEach((mediaType) => {
        newResponse.content[mediaType] = {
          schema: parseJoiSchema(joiSchema).swagger
        };
      });
      response = newResponse;
    }
  } else {
    Object.keys(response.content).forEach((mediaType) => {
      let joiSchema = response.content[mediaType].schema;
      if (joiSchema) {
        response.content[mediaType].schema = parseJoiSchema(joiSchema).swagger;
      }
    });
  }

  return response;
};

const parseResponses = (responses, openapi, produces) => {
  Object.keys(responses).forEach(function (code) {
    if (openapi === '3.0.0') {
      responses[code] = parseOpenApiResponse(responses[code], produces);
    } else {
      responses[code] = parseSwaggerResponse(responses[code]);
    }
  });
  return responses;
};

const generateSwagger = (routes, options, env) => {
  try {
    const {
      title = defaultOptions.title,
      version = defaultOptions.version,
      description = defaultOptions.description,
      basePath = defaultOptions.basePath,
      schemes = defaultOptions.schemes,
      externalDocs = defaultOptions.externalDocs
      //productAcronym = defaultOptions.productAcronym
      //dnsDomain = defaultOptions.dnsDomain
    } = options;

    if (['DOCKER', 'LOCAL'].includes(env)) env = 'dev';

    const fullBasePath = `localhost:8081/${basePath}`;

    const openapi = options.openapi === true ? '3.0.0' : defaultOptions.openapi;
    const paths = {};
    routes.forEach((route) => {
      let {
        method,
        path,
        description = '',
        summary = '',
        validation,
        tags = [],
        security = null,
        consumes,
        produces,
        responses
      } = route;
      const { body, headers, formData, params, query } = validation;
      const arrParameters = [
        { type: 'body', parameter: body },
        { type: 'headers', parameter: headers },
        { type: 'params', parameter: params },
        { type: 'formData', parameter: formData },
        { type: 'query', parameter: query }
      ].filter((item) => item.parameter !== undefined);

      if (path.includes(':')) {
        const params = path.match(/:[-a-zA-Z0-9@:%._+~#=]+/g);
        params.forEach((param) => {
          path = path.replace(param, `{${param.replace(':', '')}}`);
        });
      }

      if (!Array.isArray(tags)) {
        tags = [];
      }

      const consumesProduces =
        openapi === false
          ? { consumes: consumes || ['application/json'], produces: produces || ['application/json'] }
          : {};

      if (responses) {
        responses = parseResponses(responses, openapi, consumesProduces.produces ?? ['application/json']);
      }

      const parametersArray = parseParameters(arrParameters, openapi);
      let bodyParameters = {};
      if (openapi === false) {
        bodyParameters = {
          parameters: parametersArray
        };
      } else {
        const requestBody = { requestBody: { description, content: {}, required: true } };
        bodyParameters = {
          ...requestBody,
          parameters: parametersArray.filter((e) => {
            return e.schema.properties === undefined;
          })
        };
        if (bodyParameters.requestBody)
          bodyParameters.requestBody.content[consumesProduces?.consumes?.at() ?? 'application/json'] = parametersArray
            .filter((e) => {
              return e.schema.properties !== undefined;
            })
            ?.at();
        if (!bodyParameters.requestBody.content[consumesProduces?.consumes?.at() ?? 'application/json']) {
          delete bodyParameters.requestBody;
        }
      }

      paths[path] = paths[path] || {};
      paths[path][method] = {
        'x-guids': route['x-guids'],
        ...consumesProduces,
        description,
        summary,
        tags,
        ...bodyParameters,
        responses: responses || {},
        security
      };
    });

    let server = {};

    if (openapi === '3.0.0') {
      server = {
        openapi,
        servers: [
          {
            url: `${schemes.at()}://${fullBasePath}`
          }
        ]
      };
    } else {
      server = {
        basePath: fullBasePath,
        schemes: schemes
      };
    }

    const swaggerDoc = {
      swaggerDefinition: {
        info: {
          title,
          version,
          description
        },
        ...server,
        paths,
        externalDocs
      },
      apis: []
    };
    return swaggerJsdoc(swaggerDoc);
  } catch (error) {
    console.warn('SwaggerDocsGenerator', error);
    const { title, version, description, basePath, schemes, openapi, externalDocs } = defaultOptions;
    return swaggerJsdoc({
      swaggerDefinition: {
        info: {
          title,
          version,
          description
        },
        basePath,
        schemes,
        openapi,
        externalDocs
      },
      apis: []
    });
  }
};

const buildRuntimeUrl = (openapiDoc, env, port) => {
  const openapiObj = JSON.parse(openapiDoc);
  if (openapiObj?.servers?.at().url && ['DOCKER', 'LOCAL'].includes(env.toUpperCase())) {
    const url = openapiObj?.servers?.at().url.split('/');
    openapiObj.servers.at().url = `${url.shift()}//localhost:${port}/${url.pop()}`;
  } else if (openapiObj?.basePath) {
    openapiObj.basePath = `/${openapiObj?.basePath.split('/').pop()}`;
  }
  return openapiObj;
};

module.exports = { generateSwagger, buildRuntimeUrl };
