const file = require('../common/fs-manager');
const useCaseTemplate = require('./templates/use-case.template');
const generateFactory = require('../common/generate');

// NOTE: We can pass the template in a later stage
function createUseCaseFiles(path, definitions/* , template = null */) {
  const generatedFileList = [];
  const generate = generateFactory(useCaseTemplate);

  definitions.forEach((definition) => {
    const { name, dependencies, args } = definition;

    try {
      // REVISIT: At the moment the placeholders reggex are coupled to the template.
      const placeHolderList = [
        { regex: /<USE_CASE_DEPENDENCIES>/g, value: dependencies.join() },
        { regex: /<USE_CASE_ARGS>/g, value: args.join() },
      ];

      const generatedBaseLine = generate.baseLine(placeHolderList);

      const targetPath = path.concat('/domain/useCases/');
      file.create(targetPath, `${name}.js`, generatedBaseLine);

      generatedFileList.push(name);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Something went wrong!', error);
    }
  });

  return generatedFileList;
}

module.exports = createUseCaseFiles;
