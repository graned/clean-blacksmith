const file = require('../common/fs-manager');
const entityIndexTemplate = require('./templates/index.template');
const generateFactory = require('../common/generate');

function createIndexFile(path, layer, listToExpose) {
  const generate = generateFactory(entityIndexTemplate);

  const imports = generate.imports(listToExpose);
  const placeHolderList = [
    { regex: /<ENTITY_IMPORTS>/g, value: imports },
    { regex: /<ENTITY_NAMES>/g, value: listToExpose.toString() },
  ];

  const targetPath = path.concat(`/domain/${layer}/`);
  file.create(targetPath, 'index.js', generate.code(placeHolderList));
}

module.exports = createIndexFile;
