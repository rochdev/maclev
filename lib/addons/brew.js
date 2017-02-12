'use strict'

module.exports = function brew (options) {
  const parts = []

  if (options.brewFormulas.length) {
    parts.push('# Homebrew Formulas')

    options.brewFormulas.forEach(function (formula) {
      parts.push(`brew install ${formula}`)
    })
  }

  if (options.brewCasks.length) {
    parts.push('# Homebrew Casks')

    options.brewCasks.forEach(function (cask) {
      parts.push(`brew cask install ${cask}`)
    })
  }

  return parts.join('\n')
}
