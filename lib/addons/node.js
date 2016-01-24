'use strict';

module.exports = function node(options) {
  var parts = [];

  parts.push(`# Node`);
  parts.push(`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash`);
  parts.push(`source ~/.bash_profile`);

  options.nodeVersions.forEach(function(version) {
    parts.push(`nvm install ${version}`);
  });

  if (options.nodeVersions.length === 0) {
    parts.push(`nvm install stable`);
  }

  var version = options.nodeDefault || options.nodeVersions[0] || 'stable';

  parts.push(`nvm alias default ${version}`);
  parts.push(`nvm use ${version}`);

  options.nodeModules.forEach(function(nodeModule) {
    parts.push(`npm install -g ${nodeModule}`);
  });

  return parts.join(`\n`);
};
