'use strict';

module.exports = function vagrant() {
  if (options.vagrant === undefined) {
    return null;
  }

  return `# Vagrant
curl -L https://releases.hashicorp.com/vagrant/1.7.4/vagrant_1.7.4.dmg -o /tmp/maclev/vagrant.dmg
hdiutil attach /tmp/maclev/vagrant_1.7.4.dmg
sudo installer -pkg /Volumes/Vagrant/Vagrant.pkg -target /
hdiutil detach /Volumes/Vagrant
rm /tmp/maclev/vagrant.dmg`;
};
