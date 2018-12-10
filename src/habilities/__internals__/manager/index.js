const indexFiles = require('./createIndexFile');
const createLayer = require('./createLayer');
const helpers = require('./helpers');
const readBluePrint = require('./readBluePrint');

module.exports = ({
  createLayer: {
    useCases: createLayer.useCases,
    interactors: createLayer.interactors,
    entities: createLayer.entities,
    stores: createLayer.stores,
  },

  createIndex: indexFiles,
  helpers,
  readBluePrint,
});
