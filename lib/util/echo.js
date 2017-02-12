'use strict'

module.exports = (line, shell) => {
  let file = null

  switch (shell) {
    case 'zsh':
      file = '~/.zshrc'
      break
    case 'fish':
      file = '~/.config/fish/config.fish'
      break
    default: // bash
      file = '~/.bash_profile'
      break
  }

  return `echo '${line}' >> ${file}`
}
