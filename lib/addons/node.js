`use strict`;

module.exports = function node(options) {
  var parts = [];

  parts.push(`# Node`);
  parts.push(`# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash`);
  parts.push(`source ~/.bash_profile`);

  options.nodeVersions.forEach(function(version) {
    parts.push(`nvm install ${version}`);
  });

  if (options.nodeVersions.length) {
    var version = options.nodeDefault || options.nodeVersions[0];

    parts.push(`nvm alias default ${version}`);
    parts.push(`nvm use ${version}`);
    parts.push(`npm install -g yo bower cordova karma gulp grunt mocha cucumber forever babel-cli`);
  }

  return parts.join(`\n`);
};
