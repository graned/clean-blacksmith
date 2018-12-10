const fs = require('fs-extra');

function create(path, fileName, data) {
  fs.outputFileSync(path.concat(fileName), data, 'utf-8');
}

function readJson(path) {
  return fs.readJson(path);
}

module.exports = {
  create,
  readJson,
};
