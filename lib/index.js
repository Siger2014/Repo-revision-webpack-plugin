const writeFile = require('./write-file.js');
const runGitCommand = require('./helper/run-git-command.js');

class RepoRevisionWebpackPlugin {
    constructor (options = {}) {
      this.repoType = options.repoType || 'git';
    }

    apply (compiler) {
        console.log(compiler.options.output.path);
        compiler.plugin('done', () => {
            // 在 done 事件中回调 doneCallback
            const versionStr = runGitCommand();
            writeFile(versionStr, compiler.options.output.path);
        });
    }

}

module.exports = RepoRevisionWebpackPlugin;