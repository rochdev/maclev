'use strict';

module.exports = function base() {
  return `mkdir /tmp/maclev
touch ~/.bash_profile
sudo -v

# Xcode Command Line Tools
xcode-select --install

# Update git push behavior
git config --global push.default simple

# Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew cask`;
};
