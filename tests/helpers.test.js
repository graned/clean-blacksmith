const proxyquire = require('proxyquire');

const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const sinon = require('sinon');

const baseLineStub = sinon.stub().returns('');
const helpers = proxyquire('../src/habilities/__internals__/manager/helpers', {
  '../common/generate': () => ({
    baseLine: baseLineStub,
    properties: () => 'Some properties',
  }),
});

describe('Helpers: #createContructor', () => {
  beforeEach(() => {
    baseLineStub.resetHistory();
  });

  context('with a given property list', () => {
    it('should generate correct placeholder list', () => {
      helpers.createContructor(['name']);

      expect(baseLineStub, 'to have a call satisfying', {
        args: [[{ regex: /<ENTITY_PROPS>/g, value: 'Some properties' }]],
      });
    });
  });

  context('with an empty property list', () => {
    it('should return an empty string', () => {
      expect(helpers.createContructor(), 'to be empty');
    });
  });
});

describe('Helpers: #createFunctions', () => {
  beforeEach(() => {
    baseLineStub.resetHistory();
  });

  context('with a given name list', () => {
    it('should generate correct placeholder list', () => {
      const result = helpers.createFunctions({
        function1: { args: [], isAsync: true },
      });

      expect(baseLineStub, 'to have a call satisfying', {
        args: [
          [
            { regex: /<ASYNC_KEY>\s/g, value: 'async ' },
            { regex: /<FUNCTION_NAME>/g, value: 'function1' },
            { regex: /<FUNCTION_ARGS>/g, value: [] },
          ],
        ],
      });

      expect(result, 'to exhaustively satisfy', { fnNameList: ['function1'], generatedFnList: [''] });
    });
  });

  context('with an empty property list', () => {
    it('should return an empty string', () => {
      expect(helpers.createFunctions(null), 'to exhaustively satisfy', { fnNameList: [], generatedFnList: [] });
    });
  });
});

describe('Helpers: #createPlaceHolderMapper', () => {
  beforeEach(() => {
    baseLineStub.resetHistory();
  });

  context('for entities layer', () => {
    const definitions = [
      {
        name: 'Person',
        props: ['name', 'age'],
      },
      {
        name: 'Pet',
        props: ['type', 'size'],
      },
    ];
    it('should generate correct mapper', () => {
      expect(helpers.createPlaceHolderMapper('entities', definitions), 'to exhaustively satisfy', [
        {
          name: 'Person',
          placeHolderList: [
            { regex: /<ENTITY_NAME>/g, value: 'Person' },
            { regex: /<ENTITY_CONSTRUCTOR>/g, value: '\n' },
          ],
        },
        {
          name: 'Pet',
          placeHolderList: [
            { regex: /<ENTITY_NAME>/g, value: 'Pet' },
            { regex: /<ENTITY_CONSTRUCTOR>/g, value: '\n' },
          ],
        },
      ]);
    });
  });

  context('for interactors layer', () => {
    const definitions = [
      {
        name: 'personInteractor',
        dependencies: ['entities', 'stores'],
        functions: {
          createInstance: { args: [] },
          getName: { args: [], isAsync: true },
        },
      },
      {
        name: 'petInteractor',
        dependencies: ['entities', 'stores'],
        functions: {
          createInstance: { args: [] },
          getSize: { args: [], isAsync: true },
        },
      },
    ];
    it('should generate correct mapper', () => {
      expect(helpers.createPlaceHolderMapper('interactors', definitions), 'to exhaustively satisfy', [
        {
          name: 'personInteractor',
          placeHolderList: [
            { regex: /<DEPENDENCIES>/g, value: 'entities,stores' },
            { regex: /<FUNCTIONS>/g, value: ['', ''] },
            { regex: /<FUNCTION_NAME_LIST>/g, value: 'createInstance,getName,' },
          ],
        },
        {
          name: 'petInteractor',
          placeHolderList: [
            { regex: /<DEPENDENCIES>/g, value: 'entities,stores' },
            { regex: /<FUNCTIONS>/g, value: ['', ''] },
            { regex: /<FUNCTION_NAME_LIST>/g, value: 'createInstance,getSize,' },
          ],
        },
      ]);
    });
  });

  context('for stores layer', () => {
    const definitions = [
      {
        name: 'personStore',
        dependencies: ['dataSource'],
        functions: {
          find: { args: [] },
          create: { args: [], isAsync: true },
        },
      },
      {
        name: 'petStore',
        dependencies: ['service'],
        functions: {
          request: { args: [] },
          transform: { args: [], isAsync: true },
        },
      },
    ];
    it('should generate correct mapper', () => {
      expect(helpers.createPlaceHolderMapper('stores', definitions), 'to exhaustively satisfy', [
        {
          name: 'personStore',
          placeHolderList: [
            { regex: /<DEPENDENCIES>/g, value: 'dataSource' },
            { regex: /<FUNCTIONS>/g, value: ['', ''] },
            { regex: /<FUNCTION_NAME_LIST>/g, value: 'find,create,' },
          ],
        },
        {
          name: 'petStore',
          placeHolderList: [
            { regex: /<DEPENDENCIES>/g, value: 'service' },
            { regex: /<FUNCTIONS>/g, value: ['', ''] },
            { regex: /<FUNCTION_NAME_LIST>/g, value: 'request,transform,' },
          ],
        },
      ]);
    });
  });

  context('for useCases layer', () => {
    const definitions = [
      {
        name: 'registerPerson',
        dependencies: ['personInteractor'],
        args: ['personDetails'],
      },
      {
        name: 'registerPet',
        dependencies: ['petInteractor'],
        args: ['petDetails', 'trackid'],
      },
    ];
    it('should generate correct mapper', () => {
      expect(helpers.createPlaceHolderMapper('useCases', definitions), 'to exhaustively satisfy', [
        {
          name: 'registerPerson',
          placeHolderList: [
            { regex: /<USE_CASE_DEPENDENCIES>/g, value: 'personInteractor' },
            { regex: /<USE_CASE_ARGS>/g, value: 'personDetails' },
          ],
        },
        {
          name: 'registerPet',
          placeHolderList: [
            { regex: /<USE_CASE_DEPENDENCIES>/g, value: 'petInteractor' },
            { regex: /<USE_CASE_ARGS>/g, value: 'petDetails,trackid' },
          ],
        },
      ]);
    });
  });
});
