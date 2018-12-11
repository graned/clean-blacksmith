const beautify = require('js-beautify').js;
const path = require('path');

function domainInit() {
  throw new Error('Not yet implemented');
}

/**
 * This function creates a string representation of a list of required files to be used by an
 * index file.
 *
 * i.e. given a property list of ['personEntity', 'dogEntity']
 * the function will return the following:
 * `
 * const personEntity = require('./personEntity');
 * const dogEntity = require('./dogEntity');
 * `
 *
 * @param {*} fileNameList List of files to be imported
 * @param {*} path Path where the the files are located
 */
function imports(fileList = []) {
  let result = '';

  fileList.forEach((file, index) => {
    const pathOpts = { root: './', base: file.name };

    if (file.path != null) {
      const normalizedPath = path.normalize(file.path);
      pathOpts.dir = normalizedPath.startsWith('/')
        ? '.'.concat(normalizedPath)
        : './'.concat(normalizedPath);
    }

    const fileFullPath = path.format(pathOpts);
    result = index === fileList.length - 1
      ? result.concat(`const ${file.name} = require('${fileFullPath}');`)
      : result.concat(`const ${file.name} = require('${fileFullPath}');`, '\n');
  });

  return result;
}

/**
 * This function creates a string representation of a list of properties to be used by an entity
 * i.e. given a property list of ['name', 'age']
 * the function will return the following:
 * `
 * this.name = data.name;
 * this.age = data.age;
 * `
 *
 * @param {*} propList List of properties to be created
 */
function properties(propList = []) {
  let result = '';

  propList.forEach((prop, index) => {
    result = index === propList.length - 1
      ? result.concat(`this.${prop} = data.${prop};`)
      : result.concat(`this.${prop} = data.${prop};`, '\n');
  });

  return result;
}

/**
 * This function creates base line based on a template and a given placeholder mapping
 * @param {*} placeHolderMapperList Mapper that contains a list of objects of the values to be
 * replaced in the template. i.e. { regex: /<NAME>/g, value: 'Composer' }
 * @example
 * [
 *  { regex: /<NAME>/g, value: 'Composer' },
 *  { regex: /<INSTRUMENT>/g, value: 'Instrument' }
 * ]
 */
function baseLine(placeHolderMapperList, codeTemplate) {
  let replacedTemplate = codeTemplate;

  if (replacedTemplate == null) throw new Error('Cannot generate baseline without a template');

  placeHolderMapperList.forEach((placeholder) => {
    const { regex, value } = placeholder;
    replacedTemplate = replacedTemplate.replace(regex, value);
  });

  return beautify(replacedTemplate, { indent_size: 2 });
}
module.exports = (codeTemplate = null) => ({
  baseLine: placeHolderMapperList => baseLine(placeHolderMapperList, codeTemplate),
  domainInit,
  properties,
  imports,
});
