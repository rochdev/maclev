'use strict';

module.exports = function github() {
  return `# GitHub Desktop
curl -L https://central.github.com/mac/latest -o /tmp/maclev/github-mac.zip
unzip -o /tmp/maclev/github-mac.zip -d /tmp/maclev
sudo mv /tmp/maclev/GitHub\ Desktop.app /Applications
rm /tmp/maclev/github-mac.zip`;
};
