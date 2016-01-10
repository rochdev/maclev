'use strict';

module.exports = function gitter(options) {
  if (options.gitter === undefined) {
    return null;
  }

  return `# Gitter
curl -L https://update.gitter.im/osx/Gitter-1.162.dmg -o /tmp/maclev/gitter.dmg
hdiutil attach /tmp/maclev/gitter.dmg
sudo cp -R /Volumes/Gitter/Gitter.app /Applications
hdiutil detach /Volumes/Gitter
rm /tmp/maclev/gitter.dmg`;
};
