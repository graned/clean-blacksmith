const habilities = require('./habilities');

module.exports = async (command, details) => {
  const actionToTake = habilities[command];

  if (!actionToTake) {
    return `Sorry I don't know how to '${command}'`;
  }

  const actionResult = await actionToTake(details);
  return actionResult;
};
