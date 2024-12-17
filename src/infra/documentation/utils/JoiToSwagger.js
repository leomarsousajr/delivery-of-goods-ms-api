const patterns = {
  alphanum: '^[a-zA-Z0-9]*$',
  alphanumLower: '^[a-z0-9]*$',
  alphanumUpper: '^[A-Z0-9]*$'
};

const find = (items, query) => {
  if (!items || !items.length) return false;
  return items.find((item) => Object.keys(query).every((key) => item[key] === query[key]));
};

const meta = (schema, key) => {
  const meta = schema.$_terms.metas && schema.$_terms.metas.find((meta) => meta[key] !== undefined);
  return meta && meta[key];
};

const merge = Object.assign;

const uniqWith = (arr, fn) => arr.filter((element, index) => arr.findIndex((step) => fn(element, step)) === index);

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const getMinMax = (schema, suffix = 'Length') => {
  const swagger = {};

  for (const rule of schema._rules) {
    if (rule.name === 'min') {
      swagger[`min${suffix}`] = rule.args.limit;
    }

    if (rule.name === 'max') {
      swagger[`max${suffix}`] = rule.args.limit;
    }

    if (rule.name === 'length') {
      swagger[`min${suffix}`] = rule.args.limit;
      swagger[`max${suffix}`] = rule.args.limit;
    }
  }

  return swagger;
};

const getCaseSuffix = (schema) => {
  const caseRule = find(schema._rules, { name: 'case' });
  if (caseRule && caseRule.args.direction === 'lower') {
    return 'Lower';
  } else if (caseRule && caseRule.args.direction === 'upper') {
    return 'Upper';
  }
  return '';
};

const parseWhens = (schema, existingComponents, newComponentsByRef) => {
  const whens = schema.$_terms.whens;
  const mode = whens.length > 1 ? 'anyOf' : 'oneOf';

  const alternatives = [];
  for (const w of whens) {
    if (w.then) alternatives.push(w.then);
    if (w.otherwise) alternatives.push(w.otherwise);
    if (w.switch) {
      for (const s of w.switch) {
        if (s.then) alternatives.push(s.then);
        if (s.otherwise) alternatives.push(s.otherwise);
      }
    }
  }

  return schemaForAlternatives(alternatives, existingComponents, newComponentsByRef, mode);
};

const schemaForAlternatives = (alternatives, existingComponents, newComponentsByRef, mode) => {
  let swaggers = [];
  for (const joiSchema of alternatives) {
    const { swagger, components } = parseJoiSchema(joiSchema, merge({}, existingComponents || {}, newComponentsByRef));
    if (!swagger) continue; // swagger is falsy if joi.forbidden()
    if (joiSchema._flags.presence === 'required') {
      swagger['x-required'] = true;
    }
    merge(newComponentsByRef, components);

    swaggers.push(swagger);
  }
  swaggers = uniqWith(swaggers, isEqual);

  return swaggers.length > 0 ? { [mode]: swaggers } : {};
};

const parseValidsAndInvalids = (schema, filterFunc) => {
  const swagger = {};
  if (schema._valids) {
    const valids = schema._valids.values().filter(filterFunc);
    if (schema._flags.only && valids.length) {
      swagger.enum = valids;
    }
  }

  if (schema._invalids) {
    const invalids = schema._invalids.values().filter(filterFunc);
    if (invalids.length) {
      swagger.not = { enum: invalids };
    }
  }

  return swagger;
};

const parseAsType = {
  number: (schema) => {
    const swagger = {};

    if (find(schema._rules, { name: 'integer' })) {
      swagger.type = 'integer';
    } else {
      swagger.type = 'number';
      if (find(schema._rules, { name: 'precision' })) {
        swagger.format = 'double';
      } else {
        swagger.format = 'float';
      }
    }

    const sign = find(schema._rules, { name: 'sign' });
    if (sign) {
      if (sign.args.sign === 'positive') {
        swagger.minimum = 1;
      }

      if (sign.args.sign === 'negative') {
        swagger.maximum = -1;
      }
    }

    const min = find(schema._rules, { name: 'min' });
    if (min) {
      swagger.minimum = min.args.limit;
    }

    const max = find(schema._rules, { name: 'max' });
    if (max) {
      swagger.maximum = max.args.limit;
    }

    Object.assign(
      swagger,
      parseValidsAndInvalids(schema, (s) => typeof s === 'number')
    );

    return swagger;
  },
  string: (schema) => {
    const swagger = { type: 'string' };

    if (find(schema._rules, { name: 'alphanum' })) {
      const strict = schema._preferences?.convert === false;
      swagger.pattern = patterns[`alphanum${strict ? getCaseSuffix(schema) : ''}`];
    }

    if (find(schema._rules, { name: 'token' })) {
      swagger.pattern = patterns[`alphanum${getCaseSuffix(schema)}`];
    }

    if (find(schema._rules, { name: 'email' })) {
      swagger.format = 'email';
      if (swagger.pattern) delete swagger.pattern;
    }

    if (find(schema._rules, { name: 'isoDate' })) {
      swagger.format = 'date-time';
      if (swagger.pattern) delete swagger.pattern;
    }

    if (find(schema._rules, { name: 'guid' })) {
      swagger.format = 'uuid';
      if (swagger.pattern) delete swagger.pattern;
    }

    const pattern = find(schema._rules, { name: 'pattern' });
    if (pattern) {
      swagger.pattern = pattern.args.regex.toString().slice(1, -1);
    }

    Object.assign(swagger, getMinMax(schema));
    Object.assign(
      swagger,
      parseValidsAndInvalids(schema, (s) => typeof s === 'string')
    );

    return swagger;
  },
  binary: (schema) => {
    const swagger = { type: 'string', format: 'binary' };

    if (schema._flags.encoding === 'base64') {
      swagger.format = 'byte';
    }

    Object.assign(swagger, getMinMax(schema));

    return swagger;
  },
  date: (schema) => {
    const swagger = { type: 'string', format: 'date-time' };
    if (schema._flags.format === 'YYYY-MM-DD') {
      swagger.format = 'date';
    }
    return swagger;
  },
  boolean: () => ({ type: 'boolean' }),
  alternatives: (schema, existingComponents, newComponentsByRef) => {
    const matches = schema.$_terms.matches;
    const mode = `${schema._flags.match || 'any'}Of`;

    const alternatives = [];
    for (const m of matches) {
      if (m.ref) {
        if (m.then) alternatives.push(m.then);
        if (m.otherwise) alternatives.push(m.otherwise);
        if (m.switch) {
          for (const s of m.switch) {
            if (s.then) alternatives.push(s.then);
            if (s.otherwise) alternatives.push(s.otherwise);
          }
        }
      } else {
        alternatives.push(m.schema);
      }
    }

    return schemaForAlternatives(alternatives, existingComponents, newComponentsByRef, mode);
  },
  array: (schema, existingComponents, newComponentsByRef) => {
    const items = schema.$_terms.items;
    const mode = 'oneOf';

    const alternatives = items;

    let swaggers = [];
    for (const joiSchema of alternatives) {
      // eslint-disable-next-line max-len
      const { swagger, components } = parseJoiSchema(
        joiSchema,
        merge({}, existingComponents || {}, newComponentsByRef)
      );
      if (!swagger) continue; // swagger is falsy if joi.forbidden()

      merge(newComponentsByRef, components);

      swaggers.push(swagger);
    }
    swaggers = uniqWith(swaggers, isEqual);

    const openapi = {
      type: 'array',
      items: { [mode]: swaggers }
    };
    if (swaggers.length <= 1) {
      openapi.items = swaggers[0] || {};
    }

    Object.assign(openapi, getMinMax(schema, 'Items'));

    if (find(schema._rules, { name: 'unique' })) {
      openapi.uniqueItems = true;
    }

    return openapi;
  },
  object: (schema, existingComponents, newComponentsByRef) => {
    const requireds = [];
    const properties = {};
    let additionalProperties = {};

    const combinedComponents = merge({}, existingComponents || {}, newComponentsByRef);

    const children = schema.$_terms.keys || [];
    children.forEach((child) => {
      const key = child.key;
      const { swagger, components } = parseJoiSchema(child.schema, combinedComponents);
      if (!swagger) {
        // swagger is falsy if joi.forbidden()
        return;
      }

      merge(newComponentsByRef, components);
      merge(combinedComponents, components);

      properties[key] = swagger;

      if (child.schema._flags.presence === 'required') {
        requireds.push(key);
      }
    });

    if (!children.length) {
      const keyPatterns = schema.$_terms.patterns;
      if (keyPatterns) {
        keyPatterns.forEach((pattern) => {
          if (pattern.rule) {
            const { swagger, components } = parseJoiSchema(pattern.rule, combinedComponents);
            if (!swagger) {
              // swagger is falsy if joi.forbidden()
              return;
            }

            merge(newComponentsByRef, components);
            merge(combinedComponents, components);

            additionalProperties = swagger;
          }
        });
      }
    }

    const swagger = {
      type: 'object',
      properties
    };
    if (requireds.length) {
      swagger.required = requireds;
    }

    if (schema._flags.unknown !== true) {
      swagger.additionalProperties = false;
    }

    if (Object.keys(additionalProperties).length !== 0) {
      swagger.additionalProperties = additionalProperties;
    }

    return swagger;
  },
  any: (schema) => {
    const swagger = {};
    // convert property to file upload, if indicated by meta property
    if (meta(schema, 'swaggerType') === 'file') {
      swagger.type = 'file';
      swagger.in = 'formData';
    } else if (meta(schema, 'swaggerType') === 'fileResponse') {
      swagger.type = 'file';
    }

    Object.assign(
      swagger,
      parseValidsAndInvalids(schema, (s) => typeof s === 'string' || typeof s === 'number')
    );

    return swagger;
  }
};

const parseJoiSchema = (schema, existingComponents) => {
  if (!schema) throw new Error('No schema is specified');

  const components = {};

  if (schema._flags.presence === 'forbidden') {
    return false;
  }

  const type = meta(schema, 'baseType') || schema.type;

  if (!parseAsType[type]) {
    throw new TypeError(`${type} is not a recognized Joi type.`);
  }

  const swagger = parseAsType[type](schema, existingComponents, components);
  if (schema.$_terms.whens) {
    Object.assign(swagger, parseWhens(schema, existingComponents, components));
  }

  if (schema._valids && schema._valids.has(null)) {
    swagger['x-nullable'] = true;
  }

  const description = schema._flags.description;
  if (description) {
    swagger.description = description;
  }

  if (schema.$_terms.examples) {
    if (schema.$_terms.examples.length === 1) {
      swagger.example = schema.$_terms.examples[0];
    } else {
      swagger.examples = schema.$_terms.examples;
    }
  }

  const label = schema._flags.label;
  if (label) {
    swagger.title = label;
  }

  const defaultValue = schema._flags.default;
  if (defaultValue !== undefined && typeof defaultValue !== 'function') {
    swagger.default = defaultValue;
  }

  return { swagger, components };
};

module.exports = { parseJoiSchema };
