'use strict'

const echo = require('../../util/echo')

module.exports = function ruby (options) {
  const parts = []

  parts.push(`# Ruby`)
  parts.push(`brew install rbenv ruby-build rbenv-gemset`)
  parts.push(`eval "$(rbenv init -)"`)
  parts.push(echo('eval "$(rbenv init -)"', options.shell))

  options.rubyVersions.forEach(function (version) {
    parts.push(`rbenv install ${version}`)
  })

  if (options.rubyVersions.length) {
    const version = options.rubyDefault || options.rubyVersions[0]

    parts.push(`rbenv global ${version}`)
    parts.push(`rbenv shell ${version}`)
  }

  options.rubyGems.forEach(function (gem) {
    parts.push(`gem install ${gem}`)
  })

  return parts.join('\n')
}
