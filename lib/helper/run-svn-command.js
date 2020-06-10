let execSync = require('child_process').execSync;

module.exports = function runSvnCommand () {
    execSync('svn update');
    let svnInfo = execSync('svn info')
                    .toString()
                    .trim();
    let version = svnInfo.split('\n')[6].match(/\d+/ig)[0];
    let changeDate = svnInfo.split('\n')[11];
    let branch = svnInfo.split('\n')[3];
    console.log(version, '\n', changeDate, '\n',branch);
    let versionStr = `
        Revision: ${version}
        Branch: ${branch}
        X-PackingTime: ${changeDate}`;
    return versionStr;
}