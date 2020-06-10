const execSync = require('child_process').execSync;

const COMMITHASH_COMMAND = 'rev-parse HEAD'
const VERSION_COMMAND = 'describe --always'
const BRANCH_COMMAND = 'rev-parse --abbrev-ref HEAD'

module.exports = function runGitCommand () {
    const d = new Date();
    let versionStr = `
        Revision: ${execSync(`git ${COMMITHASH_COMMAND}` )}
        Branch: ${execSync(`git ${BRANCH_COMMAND}`)}
        X-PackingTime: ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    return versionStr;
}

