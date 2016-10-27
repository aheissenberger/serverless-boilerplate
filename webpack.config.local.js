const nodeExternals = require('webpack-node-externals')
const DotEnvEmitter = require('./dotenv-emitter')

module.exports = {
  entry: './src/handler.js',
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: 'build',
    filename: 'handler.js'
  },
  externals: [ nodeExternals() ],
  plugins: [
    new DotEnvEmitter({
      env: require(DotEnvEmitter.envfiles('local')),
      root: __dirname
    })
  ]
}
