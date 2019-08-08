const supportedModelTypes = {
  request: 'request',
  response: 'response',
};

class Model {
  constructor(type, properties) {
    this.type = supportedModelTypes[type];
    this.properties = properties || [];
  }

  static create(modelData) {
    const { type, properties } = modelData;
    return Object.freeze(new Model(type, properties));
  }
}

module.exports = Model;
