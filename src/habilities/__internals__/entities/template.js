module.exports = `
// This is an auto-generated basic Entity
class <NAME> {
  constructor(data) {
    <PROPS>}

  static create(data) {
    return Object.freeze(new <NAME>(data));
  }
}

module.exports = <NAME>;
`;
