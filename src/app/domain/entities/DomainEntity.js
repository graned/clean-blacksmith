class DomainEntity {
  constructor(properties) {
    this.properties = properties || [];
  }

  static create(domainEntityData) {
    const { properties } = domainEntityData;
    return Object.freeze(new DomainEntity(properties));
  }
}

module.exports = DomainEntity;
