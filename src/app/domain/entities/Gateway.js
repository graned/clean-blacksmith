class Gateway {
  constructor(name, dependencies, functions) {
    this.name = name || [];
    this.dependencies = dependencies || [];
    this.functions = functions || [];
  }

  static create(gatewayData) {
    const { name, dependencies, functions } = gatewayData;
    return Object.freeze(new Gateway(name, dependencies, functions));
  }
}

module.exports = Gateway;
