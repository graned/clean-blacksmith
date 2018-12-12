const logger = require('get-logger')('createLayer');

const file = require('../common/fs-manager');
const templates = require('./templates');
const generateFactory = require('../common/generate');

/**
 * This function is in charge to create the files base on an specified layer(entities, interactors,
 * stores, usecases). Recieves a list of values containing a name to be use for the file and the
 * placeholders to replace into the template.
 *
 * @example
 * given values:
 * layer = 'entities'
 * path = '/my/path'
 * valueMapper = [ {
 *  name: 'Person',
 *  placeHolderList: [
 *    { regex: /<ENTITY_NAME>/g, value: 'Person' }
 *  ]
 * } ],
 * template = 'class <ENTITY_NAME> {}'
 *
 * output: /my/path/Person.js
 * content: 'class Person {}'
 *
 * @param {*} layer Layer to work. (entities, stores, interactors, useCases)
 * @param {*} path Path where the file(s) will be generated
 * @param {*} valueMapper List of values to be appended to the file
 * @param {*} template Template to use to generate file content
 * @returns A list of fileName and the location where they were generated.
 *    i.e. [{ name: 'Person', path: '/domain/entities' }]
 */
function createDomainFiles(path, valueMapper, template) {
  const generatedFileList = [];
  const generate = generateFactory(template);

  valueMapper.forEach((element) => {
    try {
      const generatedBaseLine = generate.baseLine(element.placeHolderList).concat('\n');

      file.create(path, `${element.name}.js`, generatedBaseLine);

      generatedFileList.push({ name: element.name, path });
      logger.info(`Created file: '${path}/${element.name}.js'`);
    } catch (error) {
      logger.error('Something went wrong!', error);
    }
  });
  return generatedFileList;
}

module.exports = {
  layer: {
    useCases: (path, valueMapper) => createDomainFiles(path, valueMapper, templates.useCases),
    interactors: (path, valueMapper) => createDomainFiles(path, valueMapper, templates.interactors),
    entities: (path, valueMapper) => createDomainFiles(path, valueMapper, templates.entities),
    stores: (path, valueMapper) => createDomainFiles(path, valueMapper, templates.stores),
    index: (path, valueMapper) => createDomainFiles(path, valueMapper, templates.layerIndex),
  },

  index: (path, valueMapper) => createDomainFiles(path, valueMapper, templates.domainIndex),
};
