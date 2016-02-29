'use strict';

module.exports = function ruby(options) {
  var parts = [];

  parts.push(`# Ruby`);
  parts.push(`brew install rbenv ruby-build rbenv-gemset`);
  parts.push(`echo 'eval "$(rbenv init -)"' >> ~/.bash_profile`);
  parts.push(`source ~/.bash_profile`);

  options.rubyVersions.forEach(function(version) {
    parts.push(`rbenv install ${version}`);
  });

  if (options.rubyVersions.length) {
    let version = options.rubyDefault || options.rubyVersions[0];

    parts.push(`rbenv global ${version}`);
    parts.push(`rbenv shell ${version}`);
  }

  options.rubyGems.forEach(function(gem) {
    parts.push(`gem install ${gem}`);
  });

  return parts.join('\n');
};
