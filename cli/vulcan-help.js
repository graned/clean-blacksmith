const commandLineUsage = require('command-line-usage');
const chalk = require('chalk');
const header = require('./assets/blacksmit-header');

const optionDefinitions = [
  {
    name: 'target',
    description: 'Target directory where files will be forge.',
    alias: 't',
    type: String,
  },
  {
    name: 'blueprint',
    description: 'Path to find a json blueprint to be used for forging.',
    alias: 'b',
    type: String,
    typeLabel: '{underline file.json}',
  },
];

module.exports = () => {
  const sections = [
    {
      content: chalk.cyan(header),
      raw: true,
    },
    {
      header: 'Synopsis',
      content: '$ blacksmith <command> [options]',
    },
    {
      header: 'Command List',
      content: [
        { name: 'help', summary: 'Display help information clean-blacksmith.' },
        { name: 'forge', summary: 'Forges a new domain.' },
      ],
    },
    {
      header: 'Options',
      optionList: optionDefinitions,
    },
  ];

  return commandLineUsage(sections);
};
