'use strict'

const parser = require('./cask-parser')

module.exports = {
  dmg (name) {
    return parser.parse(`https://raw.githubusercontent.com/caskroom/homebrew-cask/master/Casks/${name}.rb`)
      .then((result) => {
        const script = []

        script.push(`# ${result.name}`)
        script.push(`curl -L ${result.url} -o /tmp/maclev/${escape(result.name)}.dmg`)
        script.push(
          `hdiutil attach -mountpoint /Volumes/${escape(result.name)} -nobrowse /tmp/maclev/${escape(result.name)}.dmg`
        )

        if (result.pkg) {
          script.push(`sudo installer -pkg /Volumes/${escape(result.name)}/${escape(result.pkg)} -target /`)
        } else {
          script.push(`sudo cp -R /Volumes/${escape(result.name)}/${escape(result.app)} /Applications`)
        }

        addBinaries(script, result.binary)

        script.push(`hdiutil detach /Volumes/${escape(result.name)}`)
        script.push(`rm /tmp/maclev/${escape(result.name)}.dmg`)

        return script.join('\n')
      })
  },

  zip (name) {
    return parser.parse(`https://raw.githubusercontent.com/caskroom/homebrew-cask/master/Casks/${name}.rb`)
      .then((result) => {
        const script = []

        script.push(`# ${result.name}`)
        script.push(`curl -L ${result.url} -o /tmp/maclev/${escape(result.name)}.zip`)
        script.push(`unzip -o /tmp/maclev/${escape(result.name)}.zip -d /tmp/maclev`)
        script.push(`sudo mv /tmp/maclev/${escape(result.app)} /Applications`)

        addBinaries(script, result.binary)

        script.push(`rm /tmp/maclev/${escape(result.name)}.zip`)

        return script.join('\n')
      })
  }
}

function escape (str) {
  return str.replace(/ /g, '\\ ')
}

function addBinaries (script, binaries) {
  binaries && Object.keys(binaries).forEach((key) => {
    script.push(`sudo ln -s /Applications/${escape(key)} /usr/local/bin/${binaries[key]}`)
  })
}
