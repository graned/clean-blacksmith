module.exports = (GatewayEntity, layerGateway, codeTemplates, utils /* logger */) => {
  function createGatewayInstance(gatewayData) {
    return new GatewayEntity(gatewayData);
  }

  /**
   * Creates the data layer folder
   * @param {*} path Path where the data layer folder will be created.
   */
  async function createLayerFolder(path) {
    const dataLayerPath = await layerGateway.createFolder(path, 'data');
    return dataLayerPath;
  }

  /**
   * Generates the dependency folder structure
   * @param {*} path Root path where the folders will be generated
   * @param {*} folderName List of folders to be generated.
   * @returns A map of the generated folder and the full path where can be found.
   * Example: { db: '/something/db', api: '/something/api' }
   */
  async function createDependencyFolders(path, folderNames) {
    const folderMapper = {};

    await Promise.all(folderNames.map(async (folderName) => {
      const createdFolderPath = await layerGateway.createFolder(path, folderName);
      folderMapper[folderName] = createdFolderPath;
    }));

    return folderMapper;
  }

  /**
   * Generates the dependency files into a given path folder structure
   * @param {*} path Root path where the files will be generated
   * @param {*} fileNames List of file names
   * @returns An array with elements containing the generated file details.
   * Example:
   * [{ name: 'pg', path: '/something/db/pg' }, { name: 'mongo', path: '/something/db/mongo' }]
   */
  async function createDependencyFiles(path, fileNames) {
    return Promise.all(fileNames.map(async (fileName) => {
      const dependencyFilePath = utils.appendFileNameToPath(path, fileName, '.js');
      await layerGateway.createFile(dependencyFilePath, codeTemplates.dependency);

      return { name: fileName, path: dependencyFilePath };
    }));
  }

  /**
   * Creates the dependent gateway files based on the specification given in the blueprint json
   *
   * @param {*} path Path where the gateway files will be created.
   * @param {*} bluePrintDependencies Dependency property from an specific blueprint layer
   */
  async function createGatewayDependencies(path, bluePrintDependencies) {
    const folderNames = bluePrintDependencies.map(dependency => dependency.name);
    const createdFolders = await createDependencyFolders(path, folderNames);

    const createdDependencies = await Promise.all(bluePrintDependencies.map(async (dependency) => {
      const dependencyFolderPath = createdFolders[dependency.name];

      const createdDependencyFiles = await createDependencyFiles(
        dependencyFolderPath,
        dependency.files,
      );

      return { name: dependency.name, path: `./${dependency.name}`, files: createdDependencyFiles };
    }));

    // TODO: Create dependencies index
    return createdDependencies;
  }

  // this will be moved to the gateway
  function replaceTemplate(collection, template) {
    let result = '';

    collection.forEach((element) => {
      const mappedValues = Object.keys(element).map(property => ({
        reggex: `⁄<${property.toUpperCase()}>⁄`,
        value: element[property],
      }));

      result = layerGateway.replaceTemplate(mappedValues, template);
    });

    return result;
  }

  /**
   * Generates a code representation for a given `function` definitions.
   * for example:
   *  "functions": [
   *    { "name": "saveSword", "args": [], "isAsync": true }
   *  ]
   * @param {*} bluePrintFunctions Functions property from an specific blueprint layer
   * @returns An object with the elements to be replaced
   * Sample response
   * {
   *    reggex: '⁄<FUNCTIONS>⁄g',
   *    value: 'async saveSword() {\n throw new Error();\n },',
   * }
   */
  function createGatewayFunctions(bluePrintFunctions) {
    return {
      reggex: '⁄<FUNCTIONS>⁄g',
      value: replaceTemplate(bluePrintFunctions, codeTemplates.funcions),
    };
  }

  /**
   * Generates the `import` code representation of some dependencies created
   * for example:
   * createdDependencies = [
   *  {
   *    name: 'db',
   *    path: './db',
   *    files: [
   *      { name: 'pg', path: '/some/thing/db/pg' },
   *      { name: 'mongo', path: '/some/thing/db/mongo' },
   *    ],
   *  },
   *  {
   *    name: 'api',
   *    path: './api',
   *    files: [
   *      { name: 'aws', path: '/some/thing/api/aws' },
   *      { name: 'google-cloud', path: '/some/thing/api/google-cloud' },
   *    ],
   *  },
   * ];
   * @param {*} createdDependencies Created dependencies
   * @returns An object with the elements to be replaced
   * Sample response
   * {
   *    reggex: '⁄<IMPORTS>⁄g',
   *    value: 'const { pg, mongo } = required('./db');\nconst { aws, google-cloud } = required('./api');'
   * }
   */
  function createGatewayImports(createdDependencies) {
    return {
      reggex: '⁄<IMPORTS>⁄g',
      value: replaceTemplate(createdDependencies, codeTemplates.dependencyImports),
    };
  }

  /**
   * Geretares a gateway file.
   * @param {*} path Path to where the file should be generated
   * @param {*} gateway Gateway instance that contains all the required information for generation.
   * @returns An object containing the file that was generated and the path.
   */
  async function createGatewayFile(path, gateway) {
    const dependencies = await createGatewayDependencies(path, gateway.dependencies);
    const functions = createGatewayFunctions(gateway.functions);
    const imports = createGatewayImports(dependencies);

    const valuesToReplace = [
      imports,
      functions,
    ];

    const gatewayFilePath = utils.appendFileNameToPath(path, gateway.name, '.js');
    const fileContent = replaceTemplate(valuesToReplace, codeTemplates.gateway);
    await layerGateway.create(gatewayFilePath, fileContent);

    return { name: gateway.name, path: gatewayFilePath };
  }

  async function createLayerIndex(createdFiles) {
    // index template
    const stuff = [
      { reggex: '⁄<IMPORTS>⁄g', value: replaceTemplate() },
      { reggex: '', value: replaceTemplate(createdFiles, codeTemplates.l) },
    ];

    // replace template
    // create index file

  }

  return {
    createGatewayInstance,
    createLayerFolder,
    createGatewayFile,
  };
};
