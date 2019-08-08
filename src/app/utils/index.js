const path = require('path');

module.exports = {
  appendFileNameToPath(basePath, fileName, extension = null) {
    return path.format({
      dir: basePath,
      file: fileName,
      ext: extension,
    });
  },
};
