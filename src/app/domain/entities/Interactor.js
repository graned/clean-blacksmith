class Interactor {
  constructor(dependencies, functions) {
    this.dependencies = dependencies || [];
    this.functions = functions || [];
  }

  static create(interactorData) {
    const { dependencies, functions } = interactorData;
    return Object.freeze(new Interactor(dependencies, functions));
  }
}

module.exports = Interactor;
