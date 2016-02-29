'use strict';

module.exports = function brew(options) {
  var parts = [];

  parts.push('# Homebrew');
  parts.push('ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"');
  parts.push('brew cask');

  options.brewFormulas.forEach(function(formula) {
    parts.push(`brew install ${formula}`);
  });

  options.brewCasks.forEach(function(cask) {
    parts.push(`brew cask install ${cask}`);
  });

  return parts.join('\n');
};
