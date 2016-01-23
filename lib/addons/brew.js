'use strict';

module.exports = function brew(options) {
  var parts = [];

  parts.push('# Homebrew');
  parts.push('ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"');
  parts.push('brew cask');

  options.formulas.forEach(function(formula) {
    parts.push(`brew install ${formula}`);
  });

  return parts.join('\n');
};
