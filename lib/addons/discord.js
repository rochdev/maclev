'use strict';

module.exports = function discord() {
  return `# Discord
curl -L https://discordapp.com/api/download?platform=osx -o /tmp/maclev/Discord.dmg
hdiutil attach /tmp/maclev/Discord.dmg
sudo cp -r /Volumes/Discord/Discord.app /Applications
hdiutil detach /Volumes/Discord
rm /tmp/maclev/Discord.dmg`;
};
