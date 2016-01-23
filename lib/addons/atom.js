'use strict';

module.exports = function atom() {
  return `# Atom
curl -L https://atom.io/download/mac -o /tmp/maclev/atom-mac.zip
unzip -o /tmp/maclev/atom-mac.zip -d /tmp/maclev
sudo mv /tmp/maclev/Atom.app /Applications
rm /tmp/maclev/atom-mac.zip`;
};
