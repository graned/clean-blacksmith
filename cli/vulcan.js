#!/usr/bin/env node
const logger = require('get-logger')('cli');
const commandLineArgs = require('command-line-args');
const blacksmith = require('../src/blacksmith');
const vulcanHelp = require('./vulcan-help');

let mergeOptions = {};

const blackSmithDefinitions = [
  { name: 'command', defaultOption: true },
  { name: 'help', alias: 'h', type: Boolean },
];

const mainOptions = commandLineArgs(blackSmithDefinitions, { stopAtFirstUnknown: true });
// eslint-disable-next-line
const argv = mainOptions._unknown || [];

/* second - parse the merge command options */
if (mainOptions.command === 'forge') {
  const mergeDefinitions = [
    { name: 'target', alias: 't', type: String },
    { name: 'blueprint', alias: 'b', type: String },
  ];

  mergeOptions = commandLineArgs(mergeDefinitions, { argv });
  blacksmith(mainOptions.command, mergeOptions).catch(logger.error);
}

if (mainOptions.help) {
  // eslint-disable-next-line
  console.log(vulcanHelp());
}
