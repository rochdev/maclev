'use strict';

module.exports = function node(options) {
  if (options.node === undefined) {
    return null;
  }

  return `# Node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
source ~/.bash_profile
nvm install 0.10
nvm install 0.12
nvm install 4
nvm install 5
nvm alias default 4
nvm use 4
npm install -g yo bower cordova karma gulp grunt mocha cucumber forever babel-cli`;
};
