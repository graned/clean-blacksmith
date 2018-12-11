const expect = require('unexpected').clone();
const generateFactory = require('../src/habilities/__internals__/common/generate');

const baseLineTemplate = 'class <NAME> { }';

describe('Generate', () => {
  it('should replace correctly placeholders', () => {
    const generate = generateFactory(baseLineTemplate);
    const placeHolderList = [{ regex: /<NAME>/g, value: 'Person' }];

    expect(generate.baseLine(placeHolderList), 'to be', 'class Person {}');
  });

  it('should generate correct property definition', () => {
    const generate = generateFactory();
    const propList = ['name', 'age'];

    expect(generate.properties(propList), 'to be', 'this.name = data.name;\nthis.age = data.age;');
  });

  it('should generate correct import definition with given path', () => {
    const generate = generateFactory();
    const fileNameList = [
      {
        name: 'file1',
        path: '/my-path/some-dir',
      },
      {
        name: 'file2',
        path: null,
      },
    ];

    expect(generate.imports(fileNameList), 'to be', 'const file1 = require(\'./my-path/some-dir/file1\');\nconst file2 = require(\'./file2\');\n\n');
  });

  it('should generate correct dependencies init definiton', () => {
    const generate = generateFactory();

    const domainDefinition = {
      stores: [
        {
          fileName: 'swordStore',
          dependencies: ['dataSource'],
        },
      ],
      interactors: [
        {
          fileName: 'swordInteractor',
          dependencies: ['entities', 'stores'],
        },
        {
          fileName: 'hammerInteractor',
          dependencies: ['entities'],
        },
      ],
    };

    expect(generate.domainInit(domainDefinition), 'to be', 'const swordStore = stores.swordStore(dataSource);\n\nconst swordInteractor = interactors.swordInteractor(entities,stores);\nconst hammerInteractor = interactors.hammerInteractor(entities);\n\n');
  });
});
