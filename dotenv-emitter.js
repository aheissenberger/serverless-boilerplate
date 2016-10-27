const fs = require('fs')
const path = require('path')

function DotEnvEmitter(options) {
  Object.assign(this, {
    env: options.env,
    root: options.root
  })
}

DotEnvEmitter.prototype.apply = function(compiler) {
  compiler.plugin('after-emit', (compilation, cb) => {
    const env = Object.keys(this.env).map(key => {
      if (this.env.hasOwnProperty(key)) {
        return `${key}="${this.env[key]}"`
      } else {
        return ''
      }
    }).filter(i => i != '').join('\n')
    fs.writeFile(path.resolve(this.root || compiler.outputPath, '.env'), env, {
      mode: 0o644,
      flags: 'w+'
    }, cb)
  })
}

module.exports = DotEnvEmitter

module.exports.envfiles = (stage) => {
  return `./env/${stage}.js`
}
