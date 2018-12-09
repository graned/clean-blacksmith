const functionTemplate = require('./templates/function.template');
const generate = require('../common/generate')(functionTemplate);

function createFunctions(functionsToGenerate) {
  const generatedFnList = [];
  const fnNameList = [];

  Object.keys(functionsToGenerate).forEach((fnName) => {
    const { args, isAsync = false } = functionsToGenerate[fnName];

    const placeHolderList = [
      { regex: /<ASYNC_KEY>\s/g, value: isAsync ? 'async'.concat(' ') : '' },
      { regex: /<FUNCTION_NAME>/g, value: fnName },
      { regex: /<FUNCTION_ARGS>/g, value: args },
    ];

    generatedFnList.push(generate.baseLine(placeHolderList));
    fnNameList.push(fnName);
  });

  return { fnNameList, generatedFnList };
}

function createPlaceHolderMapper(layer, defs) {
  const mapper = [];

  switch (layer) {
    case 'entities':
      defs.forEach((def) => {
        const { name, props } = def;
        const properties = generate.properties(props);
        mapper.push({
          name,
          placeHolderList: [
            { regex: /<ENTITY_NAME>/g, value: name },
            { regex: /<ENTITY_PROPS>/g, value: properties },
          ],
        });
      });
      break;

    case 'interactors':
    case 'stores':
      defs.forEach((def) => {
        const { name, dependencies, functions } = def;
        const { generatedFnList, stringValue } = createFunctions(functions);
        mapper.push({
          name,
          placeHolderList: [
            { regex: /<DEPENDENCIES>/g, value: dependencies.join() },
            { regex: /<FUNCTIONS>/g, value: stringValue },
            { regex: /<FUNCTION_NAME_LIST>/g, value: generatedFnList.join() },
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

module.exports = {
  createFunctions,
  createPlaceHolderMapper,
};
