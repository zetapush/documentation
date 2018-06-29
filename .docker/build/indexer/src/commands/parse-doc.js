const documentationParser = require('../utils/documentation-parser');
const fs = require('fs');
const path = require('path');

const parseDoc = (command) => {
  const records = documentationParser.parse(command.documentationDirectory);
  const outputDir = command.outputDirectory;
  let file = path.resolve(outputDir, 'index.json');
  mkdirs(file);
  fs.writeFileSync(file, JSON.stringify(records, null, 2));
};


const mkdirs = (file) => {
  let dirs = [];
  for (let dir of path.parse(file).dir.split(path.sep)) {
    dirs.push(dir);
    let dirPath = dirs.join(path.sep);
    if (dirPath) {
      fs.existsSync(dirPath) || fs.mkdirSync(dirPath);
    }
  }
};

module.exports = parseDoc;
