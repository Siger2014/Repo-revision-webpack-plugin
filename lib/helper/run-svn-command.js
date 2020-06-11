let execSync = require('child_process').execSync;

module.exports = class RunSvnCommand {
    preGetSvnInfo () {
        execSync('svn update');
        let svnInfo = execSync('svn info')
                        .toString()
                        .trim();
        return svnInfo;
    }
    getVersionStr () {
        let svnInfo = this.preGetSvnInfo();
        let version = svnInfo.split('\n')[6].match(/\d+/ig)[0];
        let changeDate = svnInfo.split('\n')[11];
        let branch = svnInfo.split('\n')[3];
        let versionStr = `
            Revision: ${version}
            Branch: ${branch}
            X-PackingTime: ${changeDate}`;
        return versionStr;
    }
    getCommand (command) {
        let svnInfo = this.preGetSvnInfo();
        const infoObj = {
            COMMITHASH_COMMAND: svnInfo.split('\n')[6].match(/\d+/ig)[0],
            VERSION_COMMAND: svnInfo.split('\n')[3],
            BRANCH_COMMAND: svnInfo.split('\n')[3],
        }
        return infoObj[command] || '该命令不存在';
    }
}