const habilities = require('./habilities');

/**
  options {
    command: 'forge',
    target: 'path/',
    blueprint: 'path/',
  }
 */
module.exports = (options) => {
  const { command, ...opts } = options;
  const actionToTake = habilities[command];

  if (!actionToTake) throw new Error(`Sorry I don't know how to '${options.command}'`);

  const actionResult = actionToTake.apply(this, opts);
  return actionResult;
};
