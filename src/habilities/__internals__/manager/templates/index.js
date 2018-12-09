const interactorTemplate = require('./common-layer.template');
const storeTemplate = require('./common-layer.template');
const entityTemplate = require('./entity.template');
const useCaseTemplate = require('./use-case.template');

module.exports = ({
  useCases: useCaseTemplate,
  interactors: interactorTemplate,
  entities: entityTemplate,
  stores: storeTemplate,
});
