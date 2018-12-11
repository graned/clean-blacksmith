const path = require('path');
const logger = require('get-logger')('forge');
const manager = require('./__internals__/manager');

function createDomain(targetPath, resources) {
  const domainResults = [];
  const domainPath = path.join(targetPath, '/domain');

  Object.keys(resources).forEach((layerToCreate) => {
    const layerPath = path.join(domainPath, `/${layerToCreate}`);
    const layerDefinition = resources[layerToCreate];

    const mapper = manager.helpers.createPlaceHolderMapper(layerToCreate, layerDefinition);
    const fileList = manager.createDomain.layer[layerToCreate](layerPath, mapper);

    const indexFileListMapper = manager.helpers.createPlaceHolderMapper('index', fileList);
    manager.createIndex.layer(layerPath, indexFileListMapper);
    domainPath.push({
      layerToCreate,
      createdFiles: fileList || [],
      dependencies: layerDefinition.dependencies || [],
    });
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
