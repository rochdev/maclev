'use strict';

module.exports = function bashGitPrompt(options) {
  if (options.bashGitPrompt === undefined) {
    return null;
  }

  return `# bash-git-prompt
brew install bash-git-prompt`;
};
