const logger = require('get-logger')('forge');

const manager = require('./__internals__/manager');

function createDomain(targetPath, resources) {
  Object.keys(resources).forEach((layer) => {
    const layerDefinition = resources[layer];
    const mapper = manager.helpers.createPlaceHolderMapper(layer, layerDefinition);
    const fileNameList = manager.createLayer[layer](targetPath, mapper);
    manager.createIndex(targetPath, layer, fileNameList);
  });

  console.log('TODO: create domain file');
}

async function forge({ target, blueprint: blueprintPath }) {
  try {
    const blueprint = await manager.readBluePrint.fromJson(blueprintPath);
    createDomain(target, blueprint);
    logger.info('Finished forging! Happy coding :)');
  } catch (error) {
    logger.info('Error while forging!', error);
  }
}

module.exports = forge;
