'use strict'

const requireDir = require('require-dir')

const addons = requireDir('../addons')
const applications = requireDir('../addons/applications')
const environments = requireDir('../addons/environments')

module.exports.handler = (event, context, callback) => {
  const query = event.queryStringParameters || {}

  const options = {
    applications: query.applications ? query.applications.split(',') : [],
    environments: query.environments ? query.environments.split(',') : [],
    shell: query['shell'] || '',
    brewFormulas: query['brew-formulas'] ? query['brew-formulas'].split(',') : [],
    brewCasks: query['brew-casks'] ? query['brew-casks'].split(',') : [],
    javaVersions: query['java-versions'] ? query['java-versions'].split(',') : [],
    javaDefault: query['java-default'],
    javaBuildTools: query['java-build-tools'] ? query['java-build-tools'].split(',') : [],
    nodeVersions: query['node-versions'] ? query['node-versions'].split(',') : [],
    nodeDefault: query['node-default'],
    nodeModules: query['node-modules'] ? query['node-modules'].split(',') : [],
    rubyVersions: query['ruby-versions'] ? query['ruby-versions'].split(',') : [],
    rubyDefault: query['ruby-default'],
    rubyGems: query['ruby-gems'] ? query['ruby-gems'].split(',') : [],
    pythonVersions: query['python-versions'] ? query['python-versions'].split(',') : [],
    pythonDefault: query['python-default'],
    pythonPackages: query['python-packages'] ? query['python-packages'].split(',') : []
  }

  loadAddons()
    .then(parts => {
      callback(null, {
        body: parts.filter(part => !!part).join('\n\n'),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': 'attachment; filename="maclev.sh"'
        }
      })
    })
    .catch(callback)

  function loadAddons () {
    return Promise.all([
      addons.base(options),
      addons.shell(options)
    ].concat(
      options.environments.filter((name) => !!environments[name]).map((name) => environments[name](options)),
      options.applications.filter((name) => !!applications[name]).map((name) => applications[name](options))
    ).concat([
      addons.brew(options),
      addons.finalize(options)
    ]))
  }
}
