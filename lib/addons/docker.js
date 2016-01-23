'use strict';

module.exports = function discord() {
  return `# Docker Toolbox
curl -L https://github.com/docker/toolbox/releases/download/v1.9.1g/DockerToolbox-1.9.1g.pkg -o /tmp/maclev/docker.pkg
sudo installer -pkg /tmp/maclev/docker.pkg -target /
rm /tmp/maclev/docker.pkg
docker-machine create --driver virtualbox --virtualbox-disk-size "60000" default
docker-machine stop default`;
};
