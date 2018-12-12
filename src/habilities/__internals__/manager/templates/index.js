const interactorTemplate = require('./common-layer.template');
const storeTemplate = require('./common-layer.template');
const entityTemplate = require('./entity.template');
const useCaseTemplate = require('./use-case.template');
const layerIndexTemplate = require('./layer-index.template');
const domainIndexTemplate = require('./domain-index.template');
const constructorTemplate = require('./constructor.template');
const functionTemplate = require('./function.template');

module.exports = ({
  useCases: useCaseTemplate,
  interactors: interactorTemplate,
  entities: entityTemplate,
  stores: storeTemplate,
  layerIndex: layerIndexTemplate,
  domainIndex: domainIndexTemplate,
  constructor: constructorTemplate,
  function: functionTemplate,
});
