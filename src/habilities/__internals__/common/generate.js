const beautify = require('js-beautify').js;
const defaultTemplate = require('../entities/templates/entity.template');

module.exports = (codeTemplate) => {
  const template = codeTemplate || defaultTemplate;

  function imports(fileNameList = []) {
    let result = '';

    fileNameList.forEach((fileName) => {
      result = result.concat(`const ${fileName} = require('./${fileName}');`, '\n');
    });

    return result;
  }

  function properties(propList = []) {
    let result = '';

    propList.forEach((prop) => {
      result = result.concat(`this.${prop} = data.${prop};`, '\n');
    });

    return result;
  }

  /**
   * This function creates code based on a template and a given placeholder mapping
   * @param {*} placeHolderMapperList Mapper that contains a list of objects of the values to be
   *    replaced in the template. i.e. { regex: /<NAME>/g, value: 'Composer' }
   *
   * sample placeHolderMapperList value is:
   * [
   *  { regex: /<NAME>/g, value: 'Composer' },
   *  { regex: /<INSTRUMENT>/g, value: 'Instrument' }
   * ]
   */
  function code(placeHolderMapperList) {
    let replacedTemplate = template;

    placeHolderMapperList.forEach((placeholder) => {
      const { regex, value } = placeholder;
      replacedTemplate = replacedTemplate.replace(regex, value);
    });

    return beautify(replacedTemplate, {
      indent_size: 2,
      preserve_newlines: false,
    });
  }

  return {
    code, properties, imports,
  };
};
