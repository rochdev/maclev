'use strict'

module.exports = (options) => {
  switch (options.shell) {
    case 'fish': {
      return `# Fish
${install('fish')}
mkdir -p ~/.config/fish
touch config.fish`
    }

    case 'zsh': {
      return `# Zsh
${install('zsh')}
touch ~/.zshrc`
    }

    default: { // Bash
      const parts = []

      parts.push(`# Bash`)

      if (options.shell === 'bash') {
        parts.push(install('bash'))
      }

      parts.push(`touch ~/.bash_profile`)

      return parts.join('\n')
    }
  }
}

function install (name) {
  return `brew install ${name}
echo "/usr/local/bin/${name}" | sudo tee -a /etc/shells > /dev/null
chsh -s /usr/local/bin/${name}`
}
