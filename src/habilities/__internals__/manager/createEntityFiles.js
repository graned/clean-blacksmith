const file = require('../common/fs-manager');
const generateFactory = require('../common/generate');

// NOTE: We can pass the template in a later stage
function createEntityFiles(path, definitions, template = null) {
  const generatedFileList = [];
  const generate = generateFactory(template);

  definitions.forEach((definition) => {
    const { name, props } = definition;

    try {
      const properties = generate.properties(props);

      // REVISIT: At the moment the placeholders reggex are coupled to the template.
      const placeHolderList = [
        { regex: /<ENTITY_NAME>/g, value: name },
        { regex: /<ENTITY_PROPS>/g, value: properties },
      ];

      const generatedCode = generate.code(placeHolderList);

      const targetPath = path.concat('/domain/entities/');
      file.create(targetPath, `${name}.js`, generatedCode);

      generatedFileList.push(name);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Something went wrong!', error);
    }
  });

  return generatedFileList;
}

module.exports = createEntityFiles;
