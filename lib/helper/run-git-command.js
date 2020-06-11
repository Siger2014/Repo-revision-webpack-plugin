const execSync = require('child_process').execSync;
const COMMITHASH_COMMAND = 'rev-parse HEAD';
const VERSION_COMMAND = 'describe --always';
const BRANCH_COMMAND = 'rev-parse --abbrev-ref HEAD';

module.exports = class RunGitCommand {
    constructor (option = {}) {
        this.command = option.command;
    }
    getVersionStr () {
        const d = new Date();
        let versionStr = `
            Revision: ${execSync(`git ${COMMITHASH_COMMAND}` )}
            Branch: ${execSync(`git ${BRANCH_COMMAND}`)}
            Release: ${execSync(`git ${VERSION_COMMAND}`)}
            X-PackingTime: ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
        return versionStr;
    }
    getCommand (command) {
        const DEFAULT_COMMAND = {
            COMMITHASH_COMMAND: 'rev-parse HEAD',
            VERSION_COMMAND: 'describe --always',
            BRANCH_COMMAND: 'rev-parse --abbrev-ref HEAD',
        }
        return execSync(`git ${DEFAULT_COMMAND[command]}`);
    }
}

