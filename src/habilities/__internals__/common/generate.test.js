const expect = require('unexpected').clone();
const generateFactory = require('./generate');

const expectedOutput = `class Person {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
  }
  static create(data) {
    return Object.freeze(new Person(data));
  }
}
module.exports = Person;`;

describe('Generate Entity Code', () => {
  context('when using default template', () => {
    it('should generate code correctly', () => {
      const generate = generateFactory();
      const properties = generate.props(['name', 'age']);

      const placeHolderList = [
        { regex: /<NAME>/g, value: 'Person' },
        { regex: /<PROPS>/g, value: properties },
      ];

      expect(generate.code(placeHolderList), 'to be', expectedOutput);
    });
  });
});
