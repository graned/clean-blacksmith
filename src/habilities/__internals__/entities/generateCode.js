const template = require('./template');

function generateProps(props = []) {
  let result = '';

  props.forEach((prop) => {
    result = result.concat(`this.${prop} = data.${prop};`, '\n');
  });
  return result;
}

function replacePlaceholders(placeHolderMapper, codeTemplate) {
  let result = codeTemplate;

  placeHolderMapper.forEach((placeholder) => {
    const { regex, value } = placeholder;
    result = result.replace(regex, value);
  });
  return result;
}

function generateCode(entityName, props) {
  const propertiesString = generateProps(props);

  const mapper = [
    { regex: /<NAME>/g, value: entityName },
    { regex: /<PROPS>/g, value: propertiesString },
  ];

  const code = replacePlaceholders(mapper, template);
  // const formattedCode =

  return code;
}

module.exports = generateCode;
