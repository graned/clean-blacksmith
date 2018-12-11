const fs = require('fs-extra');
const path = require('path');

function create(targetPath, fileName, data) {
  const fullName = path.format({
    root: targetPath,
    base: fileName,
  });
  fs.outputFileSync(fullName, data, 'utf-8');
}

function readJson(jsonFilePath) {
  return fs.readJson(jsonFilePath);
}

module.exports = {
  create,
  readJson,
};
