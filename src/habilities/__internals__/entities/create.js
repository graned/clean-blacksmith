const fs = require('fs');

function generateEntityCode(name, properties) {
  // call template
  // format and return result
}

function createIndexFile (generatedEntities) {}

function createEntities (entityDefinitions, targetPath) {
  const fullPath = targetPath.concat('/entities');
  // eslint-disable-next-line
  for (let i = 0; i < entityDefinitions.length; i++) {
    const { name, props } = entityDefinitions[i];
    // generate code
    // append code to file
    // add successfull generated code to result list
    // in case of error display error and continue
  }

  // generate index file based on generated result list
}

module.export = targetPath => definition => createEntities(definition, targetPath);
