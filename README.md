# Clean Blacksmith
Generate a [clean-architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) skeleton project easy and fast!.

<img src="https://png2.kisspng.com/sh/39fefdb9b2b8f4524ce5d848ca636895/L0KzQYm3WMA1N5pmh5H0aYP2gLBuTfhwdpZARdRuZT3rf7Bsmb1jbZYyiOR4ZIXmhLr2jr10baN7gdVuLUXlRobqVvI0PWU6faMELkO0QIG3UcM6OWY4S6UENka4SYS7VcYveJ9s/kisspng-honey-bee-honey-bee-production-service-5b65c6b3545e19.3100013915333966593456.png" width="50%" height="50%">

# Synopsis
**_Clean Blacksmith_** will help you create the base of your domain, so you can only focus on the implementation! just tell the **_CleanBlacksmith_** where you want to create your files and give him a blueprint(only JSON format supported at the moment) and he will take care of the rest.

# Installation
As a node dependency
> npm install --save-dev clean-blacksmith

Or as a CLI tool
> npm install [-g] clean-blacksmith

# Usage
You have two options of usage:

## As a node module
After instalation, just require **_clean-blacksmith_** and then give a _command_ and _details_ as parameters:
```
var cleanBlacksmith = require('clean-blacksmith');

var command = 'forge';
var details = { target: '/some/url', blueprint: '/some/url/blueprint.json' };

cleanBlacksmith(command, details)
  .then(result => { console.log('success') })
  .catch(error => { console.log('ups!') });
```

The blacksmith will give you some feedback through log messages to see what has been created:
```
Sample console output:

createLayer: Created file <entities>: 'Sword.js'
createIndex: Created file <entities>: 'index.js'
createLayer: Created file <interactors>: 'swordInteractor.js'
createIndex: Created file <interactors>: 'index.js'
createLayer: Created file <stores>: 'swordStore.js'
createIndex: Created file <stores>: 'index.js'
createLayer: Created file <useCases>: 'forgeSword.js'
createIndex: Created file <useCases>: 'index.js'
createIndex: Created domain file: 'index.js'
forge: Finished forging! Happy coding :)
```
## As CLI tool
// TODO




