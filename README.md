# PISP - Payment Initiation Service Provider integration with Mojaloop

[todo: add repo badges etc where relevant]

## project documentation
project documentation, flows, uml diagrams and so on: [/docs](./docs/README.md)

## docker-local
onboarding environment for local development & testing: [/docker-local](./docker-local/README.md)

## branching strategy
naming convention for [git branching](./docs/git_branching.md)

## Running Tests

Tests are run automatically by CircleCI.

### End To End tests

```bash
# install local node modules
npm install

# start the services
cd ./docker-local
docker-compose up -d

# wait for services to be healthy
npm run wait-4-docker

# Seed the environment with test data
npm run reseed

# Run the end to end tests
npm run test:e2e
```


> Note: You can also invoke these tests using Jest's `watch` mode:
```bash
npm run test:e2e -- --watch
```
I

### Contract Tests

```bash
# start the services
cd ./docker-contract
docker-compose up -d

npm run test:contract
```
> Note: You can also invoke these tests using Jest's `watch` mode:
```bash
npm run test:contract -- --watch
```
I

## Writing tests for PISP Features:
[todo: add notes about where in this repo to put tests]

When working on PISP features, we will follow these test guidelines:

> Note: I like to refer to Martin Fowler's [Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#TheTestPyramid) for testing inspiration and clarity.

1. Unit Tests - Implemented in their own repos on `pisp/*` feature branches.
    - use `tape` for existing repos, and `jest` for new repos

2. Integration Tests - Implemented in their respective repos

3. End To End Tests - Test the full end to end functionality of the PISP features. Implemented in _this_ repository.
  - End to end tests will call the HTTP endpoints of the real components + simulators to verify the end to end functionality
  - use `jest` + `typescript` (these are the Mojaloop Standards for new repos) and evaluate [Cucumber](https://www.npmjs.com/package/jest-cucumber) or [Gherkin](https://github.com/sjmeverett/gherkin-jest#readme) jest extensions.

4. Contract Tests - Test the interfaces between the Mojaloop Switch and DFSP/PISP components. Will be implemented in _this_ repository.
  - use `mojaloop-simulator` + `ml-testing-toolkit`

> Note: Are there other contracts we need to test here? Internally, we don't do much of this type of testing. We might find that we will want contract tests between the new `auth-service` and other Mojaloop components

### BDD

[jest-cucumber](https://github.com/bencompton/jest-cucumber) allows to use `jest` to execute Gherkin scenarios. Thanks to `jest` we are getting also code coverage for BDD Scenarios.

in `test/features` are Feature/Scenarios in `.feature` files which contain declarations in Gherkin language.

in `test/step-definitions` are Steps implementations in `.step.ts` files.

Execute scenarios and report code coverage:
```bash
npm run test:bdd
```

### Unit Testing

`Jest` setup, which allows to prepare unit tests specified in `test/**/*.(spec|test).ts` files. Coverage report is always generated. If the speed of unit tests will go very slow we will refactor configuration to generate coverage only on demand.

```bash
npm run test:unit
```

If you want to generate test report in `junit` format do:
```bash
npm run test:junit
```

There is `mojaloop` convention to use `test/unit` path to keep tests. The placement of test folder should be similar to placement of tested code in `src` folder

### Source code linting

[eslint]() setup compatible with javascript [standard](https://standardjs.com/) and dedicated for TypeScript [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint).
  - it is much more flexible
  - has good support for editors to visualize linting problem during typing.

To lint all files simply run
```bash
npm run lint
```

#### linting & auto fixing via pre-commit `husky` hook
Committing untested and bad formatted code to repo is bad behavior, so we use [husky](https://www.npmjs.com/package/husky) integrated with [lint-staged](https://www.npmjs.com/package/lint-staged). 

There is defined `pre-commit` hook which runs linting only for staged files, so execution time is as fast as possible - only staged files are linted and if possible automatically fixed.

Corresponding excerpt from package.json:

```json
 "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run test:unit",
      "post-commit": "git update-index --again"
    }
  },
  "lint-staged": {
    "*.{js,ts}": "eslint --cache --fix"
  }
```

1. Demos - End to End demos/examples 
   - We should maintain a simple end to end postman collection for demo and illustration purposes
   - These tests can be a subset of what we implement in the `#3 End to End Tests`, and are _not_ used to evaluate CI/CD passes or failure
   - For now, this should be a part of _this_ repo, but upon the release of the PISP Features, they can be included in the `mojaloop/postman` Golden Path tests.


## external links
 - [proposal documentation on google drive](https://docs.google.com/document/d/17rLpCPM2NY-i4oKGxhlBMbQahGY0k83rij2EOiU_OR4/edit)
 - [Confluence](https://modusbox.atlassian.net/wiki/spaces/GPISP/pages/648774132/Google+PISP+Documentation)
 - [ZenHub board](https://app.zenhub.com/workspaces/pisp-5e8457b05580fb04a7fd4878/board?repos=106737677)
  
