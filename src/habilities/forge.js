const path = require('path');
const logger = require('get-logger')('forge');
const manager = require('./__internals__/manager');

function createDomain(targetPath, resources) {
  const { helpers, createDomainDefinition, createDomain: createDomainFiles } = manager;
  const domainInitDefinitions = {};
  const domainPath = path.join(targetPath, '/domain');

  Object.keys(resources).forEach((layerToCreate) => {
    const layerPath = path.join(domainPath, `/${layerToCreate}`);
    const layerDefinition = resources[layerToCreate];

    const layerPlaceHolderMapper = helpers.placeHolderMappers.createLayer(
      layerToCreate,
      layerDefinition,
    );
    const createdFiles = createDomainFiles.layer[layerToCreate](
      layerPath,
      layerPlaceHolderMapper,
    );

    const layerIndexPlaceHolderMapper = helpers.placeHolderMappers.createLayerIndex(
      'index',
      createdFiles,
    );
    // NOTE: We create an index file in order to expose the layer files we created, however this
    //       file is not added to our list of files created.
    createDomainFiles.layer.index(layerPath, layerIndexPlaceHolderMapper);

    domainInitDefinitions[layerToCreate] = createDomainDefinition(
      createdFiles,
      layerDefinition,
    );
  });

  const domainIndexPlaceHolderMapper = helpers.placeHolderMappers.createDomainIndex(
    'domain',
    domainInitDefinitions,
  );
  manager.createDomain.index(domainPath, domainIndexPlaceHolderMapper);
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
