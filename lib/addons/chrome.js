'use strict';

module.exports = function chrome() {
  return `# Google Chrome
curl -L https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg -o /tmp/maclev/googlechrome.dmg
hdiutil attach /tmp/maclev/googlechrome.dmg
sudo cp -r /Volumes/Google\ Chrome/Google\ Chrome.app /Applications
hdiutil detach /Volumes/Google\ Chrome
rm /tmp/maclev/googlechrome.dmg`;
};
