class Presenter {
  constructor(functions) {
    this.functions = functions || [];
  }

  static create(presenterData) {
    const { functions } = presenterData;
    return Object.freeze(new Presenter(functions));
  }
}

module.exports = Presenter;
