const nodeExternals = require('webpack-node-externals')
const DotEnvEmitter = require('./dotenv-emitter')

module.exports = {
  entry: [
    //'babel-polyfill',
    './src/handler.js',
  ],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader' ,
          options: {
            "presets": [
              ["env", {
                  "targets": {
                    "node": "current",
                  },
                  "useBuiltIns": true,
              }],
            ],
          }
        }],
        
        exclude: [/node_modules/],
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: __dirname + '/build',
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
