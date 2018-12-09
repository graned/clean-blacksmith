const entityFiles = require('./createEntityFiles');
const layerFiles = require('./createLayerFiles');
const indexFiles = require('./createIndexFile');
const useCaseFiles = require('./createUseCaseFiles');
const createLayer = require('./createLayer');
const helpers = require('./helpers');

module.exports = ({
  create: {
    entityFiles,
    indexFiles,
    interactorFiles: layerFiles.interactors,
    storeFiles: layerFiles.stores,
    useCaseFiles,
  },

  createLayer: {
    useCases: createLayer.useCases,
    interactors: createLayer.interactors,
    entities: createLayer.entities,
    stores: createLayer.stores,
  },

  createIndex: indexFiles,
  helpers,
});
