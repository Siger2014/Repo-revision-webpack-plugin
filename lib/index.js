const writeFile = require('./write-file.js');
const RunGitCommand = require('./helper/run-git-command.js');
const RunSvnCommand = require('./helper/run-svn-command');
const testCommand = require('./helper/test-command');

class RepoRevisionWebpackPlugin {
    constructor (options = {}) {
      this.repoType = options.repoType || 'git';
      this.runner = this.repoType === 'git' ? new RunGitCommand() : new RunSvnCommand();
    }

    apply (compiler) {
        testCommand(this.repoType).then(() => {
            compiler.plugin('done', () => {
                const versionStr = this.runner.getVersionStr();
                writeFile(versionStr, compiler.options.output.path);
                // 程序执行结束
                console.info('\x1B[32m%s\x1b[0m', '\ninfo: 写入版本信息成功\n');
            });
        }).catch(err => {
            throw new Error(err)
        });
    }
    commitHash () {
        return this.runner.getCommand('COMMITHASH_COMMAND');
    }
    branch () {
        return this.runner.getCommand('BRANCH_COMMAND');
    }
    version () {
        return this.runner.getCommand('VERSION_COMMAND');
    }
}

module.exports = RepoRevisionWebpackPlugin;