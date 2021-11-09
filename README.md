# webiny-js-ci-infrastructure
Infrastructure setup for long-lived cloud services used by tests in CI.

Current list of services:
- AWS ElasticseachService Domain

To deploy:

1. Configure `webiny-ci` AWS profile in `~/.aws/credentials`. This has to be a user in the main `webiny` AWS account.


2. Run the deploy:

```shell
AWS_PROFILE=webiny-ci yarn webiny deploy e2e --env=dev
```

3. Optionally, update the necessary [Secrets](https://github.com/webiny/webiny-js/settings/environments/247074029/edit) in `webiny-js` repo

> NOTE: if you destroy and redeploy ES Domain, make sure you update `AWS_ELASTIC_SEARCH_DOMAIN_NAME` secret with the new value of `domainName`.


## Running tests

Tests are located in the `./tests` folder.

1. Run `yarn` to install all dependencies.

2. Configure `webiny-ci` AWS profile in `~/.aws/credentials`. This has to be a user in the main `webiny` AWS account.

3. Run tests: `yarn test`
