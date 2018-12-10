#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const blacksmith = require('../src/blacksmith');

let mergeOptions = {};

const blackSmithDefinitions = [
  { name: 'command', defaultOption: true },
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
}

blacksmith(mainOptions.command, mergeOptions).catch(console.log);
