class UseCase {
  constructor(name, dependencies, functions) {
    this.name = name || null;
    this.dependencies = dependencies || [];
    this.functions = functions || [];
  }

  static create(gatewayData) {
    const { name, dependencies, functions } = gatewayData;
    return Object.freeze(new UseCase(name, dependencies, functions));
  }
}

module.exports = UseCase;
