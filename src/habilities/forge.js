const manager = require('./__internals__/manager');

function forge(resources, path) {
  Object.keys(resources).forEach((layer) => {
    const layerDefinition = resources[layer];
    const mapper = manager.helpers.createPlaceHolderMapper(layer, layerDefinition);
    const fileNameList = manager.createLayer[layer](path, mapper);
    manager.createIndex(path, layer, fileNameList);
  });

  console.log('TODO: create domain file');
}

module.exports = forge;
