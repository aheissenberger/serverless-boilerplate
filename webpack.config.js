const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
  entry: [
    './src/handler.js'
  ],
  //devtool: 'source-map',
  target: 'node',
  externals: {
    "aws-sdk": {
      commonjs: "aws-sdk",
      amd: "aws-sdk" 
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader' ,
          options: {
            "presets": [
              ["env", {
                  "targets": {
                    "node": "6.10",
                  },
                  "useBuiltIns": true,
              }],
            ],
            plugins: [
              "transform-es2015-modules-commonjs",
              "transform-runtime"
            ]
          }
        }]
      },
      {
        test: /\.(bin)$/,
        use: [{
          loader: 'file-loader' ,
        }]
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: __dirname +'/build',
    filename: 'handler.js'
  },
  plugins: [
    new UglifyJSPlugin({
      compress: { warnings: false },
      //sourceMap: true
    }),
    new DotEnvEmitter({
      env: require(DotEnvEmitter.envfiles(stage))
    })
  ]
}
