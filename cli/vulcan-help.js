const commandLineUsage = require('command-line-usage');
const chalk = require('chalk');
const header = require('./assets/header');

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
      content: chalk.red(header),
      raw: true,
    },
    {
      header: 'History',
      content: 'Vulcan, God of fire 🔥, lord of metalworking and craftmanship. Forge your project with the help of this God in a simple and fast way.',
    },
    {
      header: 'Synopsis',
      content: '$ vulcan <command> [options]',
    },
    {
      header: 'Command List',
      content: [
        { name: 'help', summary: 'Displays what Vulcan is capable of.' },
        { name: 'forge', summary: 'Forges with force and fire a new domain.' },
      ],
    },
    {
      header: 'Options',
      optionList: optionDefinitions,
    },
  ];

  return commandLineUsage(sections);
};
