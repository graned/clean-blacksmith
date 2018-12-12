const templates = require('./templates');
const generateFactory = require('../common/generate');

/**
 * Function that creates a domain init mapper based on a list of files that were created.
 *
 * @param {*} createdFiles
 * @param {*} layerDefinitions
 */
function createDomainDefinition(createdFiles, layerDefinitions) {
  const definition = [];

  createdFiles.forEach((file) => {
    const { fileName } = file;
    const layerDef = layerDefinitions.filter(def => def.name === fileName).pop();

    if (!layerDef) throw new Error('Created file not in definition');

    definition.push({
      fileName,
      dependencies: layerDef.dependencies,
    });
  });

  return definition;
}

/**
 * Function that creates a string representation of a constructor function, if a list of properties
 * is given, otherwise returns an empty string.
 * @param {*} properties List of properties to be part of the constructor function.
 */
function createContructor(properties = []) {
  const generate = generateFactory(templates.constructor);

  if (properties.length === 0) {
    return '';
  }

  const props = generate.properties(properties);
  const placeHolderList = [
    { regex: /<ENTITY_PROPS>/g, value: props },
  ];

  return generate.baseLine(placeHolderList).concat('\n');
}

/**
* Function that creates a string representation of functions, based on a given list.
 * @param {*} functionsToGenerate List of functions to be created.
 */
function createFunctions(functionsToGenerate = {}) {
  const generatedFnList = [];
  const fnNameList = [];

  if (functionsToGenerate) {
    const generate = generateFactory(templates.function);

    Object.keys(functionsToGenerate).forEach((fnName) => {
      const { args, isAsync = false } = functionsToGenerate[fnName];

      const placeHolderList = [
        { regex: /<ASYNC_KEY>\s/g, value: isAsync ? 'async'.concat(' ') : '' },
        { regex: /<FUNCTION_NAME>/g, value: fnName },
        { regex: /<FUNCTION_ARGS>/g, value: args },
      ];

      generatedFnList.push(generate.baseLine(placeHolderList).concat('\n'));
      fnNameList.push(fnName);
    });
  }

  return { fnNameList, generatedFnList };
}

/**
 * Function that creates a map given a list of definitions. This list contains the name of the
 * definition and a list of placeholders with the values to be used in the place of the placeholder.
 * @param {*} layer Clean architecture layer(entities, interactors, stores, useCases)
 * @param {*} defs Domain definitions.
 */
function createLayer(layer, defs) {
  const mapper = [];

  switch (layer) {
    case 'entities':
      defs.forEach((def) => {
        const { name, props } = def;
        const constructor = createContructor(props);
        mapper.push({
          name,
          placeHolderList: [
            { regex: /<ENTITY_NAME>/g, value: name },
            { regex: /<ENTITY_CONSTRUCTOR>/g, value: constructor },
          ],
        });
      });
      break;

    case 'interactors':
    case 'stores':
      defs.forEach((def) => {
        const { name, dependencies, functions } = def;
        const { fnNameList, generatedFnList } = createFunctions(functions);
        mapper.push({
          name,
          placeHolderList: [
            { regex: /<DEPENDENCIES>/g, value: dependencies.join() },
            { regex: /<FUNCTIONS>/g, value: generatedFnList.join('\n') },
            { regex: /<FUNCTION_NAME_LIST>/g, value: fnNameList.join().concat(',') },
          ],
        });
      });
      break;

    case 'useCases':
      defs.forEach((def) => {
        const { name, dependencies, args } = def;
        mapper.push({
          name,
          placeHolderList: [
            { regex: /<USE_CASE_DEPENDENCIES>/g, value: dependencies.join() },
            { regex: /<USE_CASE_ARGS>/g, value: args.join() },
          ],
        });
      });
      break;

    default:
      throw new Error(`Unsupported layer '${layer}'`);
  }

  return mapper;
}

function createPlaceHolderIndexMapper(indexType/* , defs */) {
  // const mapper = [];

  switch (indexType) {
    case 'layer': throw new Error('Not yet implemented');

    case 'domain': throw new Error('Not yet implemented');

    default:
      throw new Error('Index file not supported');
  }

  // return mapper;
}

module.exports = {
  createContructor,
  createDomainDefinition,
  createFunctions,


  placeHolderMappers: {
    createDomainIndex,
    createLayerIndex,
    createLayer,
  },
};
