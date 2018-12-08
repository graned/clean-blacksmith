const defaultTemplate = require('./template');

module.exports = (template = defaultTemplate) => {
  function props(properties = []) {
    let result = '';

    properties.forEach((prop) => {
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
    // const formattedCode =

    return replacedTemplate;
  }

  return {
    code, props,
  };
};
