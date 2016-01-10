'use strict';

module.exports = function hub(options) {
  if (options.hub === undefined) {
    return null;
  }

  return `# hub
brew install hub`;
};
