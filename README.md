# serverless-boilerplate
Serverless boilerplate with webpack, for AWS Lambda and API Gateway
---
# Basics

1. Run local dev server:
```bash
npm run serve:local
```

2. Deploy
```bash
npm run deploy -- [--stage <stage>] [--region <region>]
```

3. Remove
```bash
npm run remove -- [--stage <stage>] [--region <region>]
```

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
