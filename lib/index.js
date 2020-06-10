const writeFile = require('./write-file.js');
const runGitCommand = require('./helper/run-git-command.js');
const runSvnCommand = require('./helper/run-svn-command');
const testCommand = require('./helper/test-command');

class RepoRevisionWebpackPlugin {
    constructor (options = {}) {
      this.repoType = options.repoType || 'git';
    }

    apply (compiler) {
        testCommand(this.repoType).then(() => {
            compiler.plugin('done', () => {
                const versionStr = this.repoType === 'git' ? runGitCommand() : runSvnCommand();
                writeFile(versionStr, compiler.options.output.path);
                // 程序执行结束
                console.info('\x1B[32m%s\x1b[0m', '\ninfo: 写入版本信息成功\n');
            });
        }).catch(err => {
            throw new Error(err)
        });
    }

}

module.exports = RepoRevisionWebpackPlugin;