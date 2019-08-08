module.exports = dataLayerInteractor => async (requestModel) => {
  const { rootPath, definitions } = requestModel;
  const layerPath = await dataLayerInteractor.createLayerFolder(rootPath);


  // create files based on definitions
  const createdGatewayFiles = await Promise.all(definitions.map(async (definition) => {
    const gatewayInstance = dataLayerInteractor.createGatewayInstance(definition);
  }));
  // return array of created files
};
