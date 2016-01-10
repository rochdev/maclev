'use strict';

module.exports = function ruby(options) {
  if (options.ruby === undefined) {
    return null;
  }

  return `# Ruby
brew install rbenv ruby-build rbenv-gemset
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
rbenv install 1.9.3-p429
rbenv shell 1.9.3-p429
gem install bundler
`;
};
