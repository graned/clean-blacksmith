const file = require('../common/fs-manager');
const layerTemplate = require('./templates/common-layer.template');
const functionTemplate = require('./templates/function.template');
const generateFactory = require('../common/generate');

function createFunctions(functionsToGenerate) {
  let stringValue = '';
  const generatedFnList = [];

  const generate = generateFactory(functionTemplate);

  Object.keys(functionsToGenerate).forEach((fnName) => {
    const { args, isAsync = false } = functionsToGenerate[fnName];

    const placeHolderList = [
      { regex: /<ASYNC_KEY>\s/g, value: isAsync ? 'async'.concat(' ') : '' },
      { regex: /<FUNCTION_NAME>/g, value: fnName },
      { regex: /<FUNCTION_ARGS>/g, value: args },
    ];

    stringValue = stringValue.concat(generate.baseLine(placeHolderList));
    generatedFnList.push(fnName);
  });

  return { generatedFnList, stringValue };
}

// NOTE: We can pass the template in a later stage
function createLayerFiles(path, definitions, layer /* , template = null */) {
  const generatedFileList = [];
  const generate = generateFactory(layerTemplate);

  definitions.forEach((definition) => {
    const { name, dependencies, functions } = definition;

    try {
      const { generatedFnList, stringValue } = createFunctions(functions);

      // REVISIT: At the moment the placeholders reggex are coupled to the template.
      const placeHolderList = [
        { regex: /<DEPENDENCIES>/g, value: dependencies.join() },
        { regex: /<FUNCTIONS>/g, value: stringValue },
        { regex: /<FUNCTION_NAME_LIST>/g, value: generatedFnList.join() },
      ];

      const generatedBaseLine = generate.baseLine(placeHolderList);

      const targetPath = path.concat(`/domain/${layer}/`);
      file.create(targetPath, `${name}.js`, generatedBaseLine);

      generatedFileList.push(name);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Something went wrong!', error);
    }
  });

  return generatedFileList;
}

module.exports = {
  interactors: (path, definitions) => createLayerFiles(path, definitions, 'interactors'),
  stores: (path, definitions) => createLayerFiles(path, definitions, 'stores'),
};
