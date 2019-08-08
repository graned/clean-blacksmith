class Controller {
  constructor(dependencies, functions) {
    this.dependencies = dependencies || [];
    this.functions = functions || [];
  }

  static create(controllerData) {
    const { dependencies, functions } = controllerData;
    return Object.freeze(new Controller(dependencies, functions));
  }
}

module.exports = Controller;
