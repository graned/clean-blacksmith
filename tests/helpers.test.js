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

// describe('Helpers: #createFunctions', () => {});
// describe('Helpers: #createPlaceHolderMapper', () => {});
