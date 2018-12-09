const file = require('../common/fs-manager');
const templates = require('./templates');
const generateFactory = require('../common/generate');

// layer: 'useCases',
// [{
//   name: 'somthing'
//   placeHolderList: [
//     { regex: /<ENTITY_NAME>/g, value: name },
//     { regex: /<ENTITY_PROPS>/g, value: properties },
//   ]
// }]

// NOTE: We can pass the template in a later stage
function createLayerFiles(layer, path, valueMapper, template) {
  const generatedFileList = [];
  const generate = generateFactory(template);

  valueMapper.forEach((element) => {
    try {
      const generatedBaseLine = generate.baseLine(element.placeHolderList);

      const targetPath = path.concat(`/domain/${layer}/`);
      file.create(targetPath, `${element.name}.js`, generatedBaseLine);

      generatedFileList.push(element.name);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Something went wrong!', error);
    }
  });

  return generatedFileList;
}

module.exports = {
  useCases: (path, valueMapper) => createLayerFiles('useCases', path, valueMapper, templates.useCases),
  interactors: (path, valueMapper) => createLayerFiles('interactors', path, valueMapper, templates.interactors),
  entities: (path, valueMapper) => createLayerFiles('entities', path, valueMapper, templates.entities),
  stores: (path, valueMapper) => createLayerFiles('stores', path, valueMapper, templates.stores),
};
