const entityFiles = require('./createEntityFiles');
const layerFiles = require('./createLayerFiles');
const indexFiles = require('./createIndexFile');
const useCaseFiles = require('./createUseCaseFiles');

module.exports = ({
  create: {
    entityFiles,
    indexFiles,
    interactorFiles: layerFiles.interactors,
    storeFiles: layerFiles.stores,
    useCaseFiles,
  },
});
