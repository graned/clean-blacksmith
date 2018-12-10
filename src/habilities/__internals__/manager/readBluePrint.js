const file = require('../common/fs-manager');

function fromJson(path) {
  return file.readJson(path);
}

module.exports = {
  fromJson,
};
