# PISP - Payment Initiation Service Provider integration with Mojaloop


## project documentation
project documentation, flows, uml diagrams and so on: [/docs](./docs/README.md)

## docker-local
onboarding environment for local development & testing: [/docker-local](./docker-local/README.md)

## branching strategy
naming convention for [git branching](./docs/git_branching.md)

## Writing tests for PISP Features:

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

5. Demos - End to End demos/examples 
   - We should maintain a simple end to end postman collection for demo and illustration purposes
   - These tests can be a subset of what we implement in the `#3 End to End Tests`, and are _not_ used to evaluate CI/CD passes or failure
   - For now, this should be a part of _this_ repo, but upon the release of the PISP Features, they can be included in the `mojaloop/postman` Golden Path tests.


## external links
 - [proposal documentation on google drive](https://docs.google.com/document/d/17rLpCPM2NY-i4oKGxhlBMbQahGY0k83rij2EOiU_OR4/edit)
 - [Confluence](https://modusbox.atlassian.net/wiki/spaces/GPISP/pages/648774132/Google+PISP+Documentation)
 - [ZenHub board](https://app.zenhub.com/workspaces/pisp-5e8457b05580fb04a7fd4878/board?repos=106737677)
  
