# serverless-boilerplate
Serverless boilerplate with webpack and Babel, for AWS Lambda and API Gateway
---
# Features

1. Serverless 1.9
2. Webpack 2.x
3. Babel 6 (optimized transpile to node 6.10)
4. AWS Lambda Node 6.10
4. local Debugging with Sourcemaps
5. Designed for use with AWS Lambda and API Gateway

# SETUP
*Needs to be repeated after each yarn upgrade!!*

## Uglifyjs ERROR
`ERROR in handler.js from UglifyJs Unexpected token: punc ({) [handler.js:706,24]`
this tells you that the installed version of `uglifyjs-webpack-plugin` is using a uglify which does not support ES6.

*fix the problem by deleting the installed uglify package:*
```bash
pushd node_modules/uglifyjs-webpack-plugin/node_modules/ && \
rm -fr uglify-js && \
rm .bin/uglifyjs && \
popd
```

## serverless-webpack server / missing header
`patch -p0 -i fix_serverless-webpack.patch`

serverless-webpack does not suport setting headers when used with LambdaProxyIntegration / "server:local" on returning results - use this to fix: https://github.com/aheissenberger/serverless-webpack/commit/ec014fa6dd48f4eb81ce566583f7702271f3a937

# Basics

1. Run local dev server:
```bash
yarn serve:local
```

2. Deploy
```bash
yarn deploy [-- [--stage <stage>] [--region <region>] ]
```

3. Remove
```bash
yarn run remove [-- [--stage <stage>] [--region <region>] ]
```

4. Invoke local function
```bash
yarn invoke <function name>
```
this will use event.json - if you need an other event.json, you need to duplicate this call - adding "-p " as a parameter after the function name does not work!!

5. log on AWS
```bash
yarn log <function name>
```

6. DEBUG API Functions
```bash
yarn debug:serve
```

7. DEBUG Event Functions
```bash
yarn debug:invoke <function name>
```
this will use event.json

8. DEBUG Tests
```bash
node --inspect-brk ./node_modules/.bin/jest -i --runInBand --env jest-environment-node-debug <XXXX.test.js>
```
Wichtig: Voraussetzung `yarn add --dev jest-environment-node-debug`

9. Tests
```bash
yarn jest -- <filename>.test.js
```

10. Coverage
```bash
yarn jest -- --coverage
```
The HTML Version of the report: /server/coverage/lcov-report/index.html

# Configurations
Configurations have two parts - [serverless infrastructure](#serverless-configuration) and [execution environment for Lambda](#lambda-environment)

---

## Serverless Infrastructure Configuration <a name="serverless-configuration"></a>

1. Currently, the infrastructure configuration consists of AWS Access Key ID and the Secret Access Key only. You are free to add more stage/region-dependent infrastructure configuration
2. Example config file is in `./serverless/local.example.yml`, name your config as `<stage>.yml` and the deploy/remove script will know

## Lambda Execution Environment <a name="lambda-environment"></a>

1. It contains all the custom environment variables readable by the Lambda Function. I have written a webpack plugin to read them from a Javascript file and then write to a dotenv-compatible environment variable file.
2. Example environment file is in `./env/local.example.yml`, name your config as `<stage>.yml` and deploy/remove script will know

## usage

# static Assets
any file with the extention `.bin` and which is refered by an `import filename from "./file.bin"` will be copied to the `build` directory. The final Path and filename is avaiable in the variable `filename`

## Notes

1. Even if you are running local server, you must have a valid serverless infrastructure config file.
2. The resulting environment variable file will be in the Lambda Function archive as well. So it is safe to use the [dotenv](https://www.npmjs.com/package/dotenv) package.
3. serverless-webpack does not suport setting headers when used with "server:local" - use this to fix: https://github.com/aheissenberger/serverless-webpack/commit/ec014fa6dd48f4eb81ce566583f7702271f3a937
4. if you get the error `ERROR in handler.js from UglifyJs Unexpected token: punc ({) [handler.js:715,24]` insure that there is no 'uglify-js' folder (`/server/node_modules/uglifyjs-webpack-plugin/node_modules`) in the node_modules of `uglifyjs-webpack-plugin`. This will prevent to use the module `/server/node_modules/uglify-js` which does support compressing ES6!

