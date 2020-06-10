const fs = require('fs');

function writeFile (versionStr, outputPath, fileName = 'version.txt') {
    fs.writeFileSync(`${outputPath}/${fileName}`, versionStr);
}

module.exports = writeFile;