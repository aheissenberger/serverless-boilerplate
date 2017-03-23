# serverless-boilerplate
Serverless boilerplate with webpack and Babel, for AWS Lambda and API Gateway
---
# Features

1. Serverless 1.9
2. AWS Lambda Node 6.10
2. Webpack 2.x
3. Babel 6 (optimized transpile to node 6.10)
4. local Debugging with Sourcemaps
4. Designed for use with AWS Lambda and API Gateway

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
yarn debug:server
```

7. DEBUG Event Functions
```bash
yarn debug:invoke <function name>
```
this will use event.json

# Configurations
Configurations have two parts - [serverless infrastructure](#serverless-configuration) and [execution environment for Lambda](#lambda-environment)

---

## Serverless Infrastructure Configuration <a name="serverless-configuration"></a>

1. Currently, the infrastructure configuration consists of AWS Access Key ID and the Secret Access Key only. You are free to add more stage/region-dependent infrastructure configuration
2. Example config file is in `./serverless/local.example.yml`, name your config as `<stage>.yml` and the deploy/remove script will know

## Lambda Execution Environment <a name="lambda-environment"></a>

1. It contains all the custom environment variables readable by the Lambda Function. I have written a webpack plugin to read them from a Javascript file and then write to a dotenv-compatible environment variable file.
2. Example environment file is in `./env/local.example.yml`, name your config as `<stage>.yml` and deploy/remove script will know

## Notes

1. Even if you are running local server, you must have a valid serverless infrastructure config file.
2. The resulting environment variable file will be in the Lambda Function archive as well. So it is safe to use the [dotenv](https://www.npmjs.com/package/dotenv) package.
3. serverless-webpack does not suport setting headers when used with "server:local" - use this to fix: https://github.com/aheissenberger/serverless-webpack/commit/ec014fa6dd48f4eb81ce566583f7702271f3a937
