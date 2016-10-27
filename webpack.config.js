const webpack = require('webpack')
const DotEnvEmitter = require('./dotenv-emitter')
const cli = require('cli')

cli.enable('help', 'version')
cli.parse({
  stage: [ 's', 'stage of environment, <dev|staging|prod>', 'string', 'local'],
  region: [ 'r', 'region of deployment', 'string', 'ap-northeast-1' ]
})

const stage = cli.options.stage
if (stage == null) {
  console.error('please provide a stage with -s <stage> or --stage <stage>.')
  process.exit(1)
}

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
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new DotEnvEmitter({
      env: require(DotEnvEmitter.envfiles(stage))
    })
  ]
}
