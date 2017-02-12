'use strict'

const echo = require('../../util/echo')

module.exports = function (options) {
  const parts = []
  const caskMap = {
    '6': 'java6',
    '7': 'java7',
    '8': 'java',
    '9': 'java9-beta'
  }

  parts.push(`# Java`)
  parts.push(`brew install jenv`)
  parts.push(`eval "$(jenv init -)"`)
  parts.push(echo('eval "$(jenv init -)"', options.shell))
  parts.push(echo('export JAVA_HOME=$(jenv javahome)', options.shell))

  options.javaVersions.forEach(function (version) {
    if (caskMap[version]) {
      parts.push(`brew cask install ${caskMap[version]}`)
      parts.push(`jenv add $(/usr/libexec/java_home -v 1.${version})`)
    }
  })

  if (options.javaVersions.length) {
    const version = options.javaDefault || options.javaVersions[0]

    parts.push(`jenv global 1.${version}`)
    parts.push(`jenv shell 1.${version}`)
  }

  if (options.javaBuildTools.indexOf('ant') !== -1) {
    parts.push(`brew install ant`)
    parts.push(echo('export ANT_HOME=/usr/local/opt/ant/libexec', options.shell))
  }

  if (options.javaBuildTools.indexOf('gradle') !== -1) {
    parts.push(`brew install gradle`)
    parts.push(echo('export GRADLE_HOME=/usr/local/opt/gradle/libexec', options.shell))
  }

  if (options.javaBuildTools.indexOf('maven') !== -1) {
    parts.push(`brew install gradle`)
    parts.push(echo('export M2_HOME=/usr/local/opt/maven/libexec', options.shell))
    parts.push(echo('export M2=$M2_HOME/bin', options.shell))
  }

  return parts.join('\n')
}
