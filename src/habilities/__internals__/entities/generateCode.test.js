const expect = require('unexpected').clone();
const generateCode = require('./generateCode');

const expectedOutput = `
class Person {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
  }

  static create(data) {
    return Object.freeze(new Person(data));
  }
}

module.exports = Person;
`;
// eslint-disable-next-line
describe('Generate Entity Code', () => {
  // eslint-disable-next-line
  it('should generate code correctly', () => {
    expect(generateCode('Person', ['name', 'age']), 'to be', expectedOutput);
  });
});
