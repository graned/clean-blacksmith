module.exports = (Hammer, hammerGateway) => {
  function requestMaterials() {
    throw new Error('Not yet implemented');
  }

  async function meltSilver() {
    throw new Error('Not yet implemented');
  }

  async function hitHard(place, material) {
    throw new Error('Not yet implemented');
  }

  return {
    requestMaterials,
    meltSilver,
    hitHard,
  };
};
