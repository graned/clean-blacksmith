const templates = require('./templates');
const generateFactory = require('../common/generate');

/**
 * Function that creates a domain init mapper based on a list of files that were created.
 *
 * @param {*} createdFiles List of files created in the domain
 * @param {*} layerDefinitions Blueprint definitions for a layer
 */
function createDomainDefinition(createdFiles, layerDefinitions) {
  const definition = [];

  createdFiles.forEach((file) => {
    const { name } = file;
    const layerDef = layerDefinitions.filter(def => def.name === name).pop();

    if (!layerDef) throw new Error('Created file not in definition');

    definition.push({
      name,
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

/**
 * Generates a map of placeholder values to be replaced.
 *
 * @param {*} listOfFiles
 */
function createLayerIndex(listOfFiles) {
  const generate = generateFactory(templates.layerIndex);

  // NOTE: Set path to null to have a proper index import.
  const createdLayerFiles = listOfFiles.map(({ name }) => ({ name, path: null }));
  const imports = generate.imports(createdLayerFiles);

  return [
    {
      name: 'index',
      placeHolderList: [
        { regex: /<IMPORTS>/g, value: imports },
        { regex: /<EXPOSED_NAMES>/g, value: listOfFiles.map(f => f.name).join().concat(',') },
      ],
    },
  ];
}

/**
 * Generates a map of placeholders values to be replaced in the domain index file.
 *
 * @param {*} domainDefinitions
 * Domain definitions will have the following structure
 * {
 *  entities:    [{name, dependencies}, {name, dependencies}],
 *  interactors: [{name, dependencies}, {name, dependencies}],
 *  stores:      [{name, dependencies}, {name, dependencies}],
 *  useCases:    [{name, dependencies}, {name, dependencies}],
 * }
 *
 */
function createDomainIndex(domainDefinitions) {
  const generate = generateFactory(templates.domainIndex);

  const createdLayers = Object.keys(domainDefinitions).map(layer => ({ name: layer, path: null }));
  const imports = generate.imports(createdLayers);
  const domainInit = generate.domainInit(domainDefinitions);
  const useCasesToExpose = domainDefinitions.useCases != null
    && domainDefinitions.useCases.length > 0
    ? domainDefinitions.useCases.map(useCase => useCase.name).join().concat(',')
    : '// Nothing to expose';

  return [
    {
      name: 'index',
      placeHolderList: [
        { regex: /<IMPORTS>/g, value: imports },
        { regex: /<DOMAIN_INITIALIZATIONS>/g, value: domainInit },
        { regex: /<USE_CASE_LIST>/g, value: useCasesToExpose },
      ],
    },
  ];
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
