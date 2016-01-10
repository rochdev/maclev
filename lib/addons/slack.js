'use strict';

module.exports = function slack(options) {
  if (options.slack === undefined) {
    return null;
  }

  return `# Slack
curl -L https://slack.com/ssb/download-osx -o /tmp/maclev/slack.zip
unzip -o /tmp/maclev/slack.zip -d /tmp/maclev
sudo mv /tmp/maclev/Slack.app /Applications
rm /tmp/maclev/slack.zip`;
};
