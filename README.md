# PISP - Payment Initiation Service Provider integration with Mojaloop

## Branching Strategy
  1. When we are creating a new branch we are using `pisp/` prefix in branch name. 
  2. We have `pisp/master` leading branch to keep our final feature candidate to be merged with `master`
  3. Newly created PR for every WIP branch should have `pisp/master` set as target
  4. When the new version of `master` is published (by other team for example), we should propagate all changes via merge with `pisp/master`


## Testing:

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

