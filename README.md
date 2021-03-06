Generate a [clean-architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) skeleton project easy and fast!.

# Clean Blacksmith [![CircleCI](https://circleci.com/gh/graned/clean-blacksmith/tree/master.svg?style=svg)](https://circleci.com/gh/graned/clean-blacksmith/tree/master)
<img src="https://vignette.wikia.nocookie.net/tabularasadd/images/8/84/Hephaestus.jpg/revision/latest?cb=20120420210624" width="50%" height="50%">

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
createdDomainFiles: '<TARGET PATH>/domain/entities/Sword.js'
createdDomainFiles: '<TARGET PATH>/domain/entities/index.js'
createdDomainFiles: '<TARGET PATH>/domain/interactors/swordInteractor.js'
createdDomainFiles: '<TARGET PATH>/domain/interactors/index.js'
createdDomainFiles: '<TARGET PATH>/domain/stores/swordStore.js'
createdDomainFiles: '<TARGET PATH>/domain/stores/index.js'
createdDomainFiles: '<TARGET PATH>/domain/useCases/forgeSword.js'
createdDomainFiles: '<TARGET PATH>/domain/useCases/index.js'
createdDomainFiles: '<TARGET PATH>/domain/domain/index.js'
forge: Finished forging! Happy coding :)
```
## As CLI tool
If you like to use your terminal to create your domain, this module offers as well a CLI tool called
[vulcan](https://en.wikipedia.org/wiki/Vulcan_(mythology)). **_Vulcan_** recieves a command and some
parameters in order to create your service domain.


Example:
```
vulcan <COMMAND> --target <PATH> --blueprint <PATH>

vulcan forge --target "/path-to-project/" --blueprint "/path-to-blueprint/blueprint.json"
```

If you need to learn what is the current available commands, you can display the help:
```
vulcan --help [-h]
```

# Blueprint file
The blueprint file defines the way our domain is constructed, this is required in order to know
how layers are defined. The file at the moment **only supports JSON format** but it will be target later to
support more formats.

_NOTE_: This project contains two full blueprint examples definitions in the `/examples` folder.

```
for example:
{
  "entities": [
    {
      "name": "Sword",
      "props": ["type","weight"]
    }
  ],
  "interactors": [
    {
      "name": "swordInteractor",
      "dependencies": ["entities", "stores"],
      "functions": {
        "requestMaterials": { "args": [] },
        "meltSilver": { "args": [], "isAsync": true }
      }
    }
  ],
  "stores": [...],
  "useCases": [
    {
      "name": "forgeKatana",
      "dependencies": ["swordInteractor"],
      "args": ["swordMaterials"]
    }
  ]
}
```

# Further plans
- Inlude more command options: `ammend`, `enhance`, `destroy`.
- Add a way to create the blueprint in a more friendly way. UI will be ideal
