const exec = require('child_process').exec;

module.exports = function testCommand (command) {
    return new Promise((resolve, reject) => {
        exec(`${command} --version`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stdout);
        });
    })
}
