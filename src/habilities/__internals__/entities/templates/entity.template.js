module.exports = `
class <ENTITY_NAME> {
  constructor(data) {
    <ENTITY_PROPS>
  }

  static create(data) {
    return Object.freeze(new <ENTITY_NAME>(data));
  }
}

module.exports = <ENTITY_NAME>;
`;
