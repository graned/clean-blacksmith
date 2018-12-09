module.exports = `
class <ENTITY_NAME> {
  <ENTITY_CONSTRUCTOR>
  static create(data) {
    return Object.freeze(new <ENTITY_NAME>(data));
  }
}

module.exports = <ENTITY_NAME>;
`;
