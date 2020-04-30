# PISP - Payment Initiation Service Provider integration with Mojaloop

## branch strategy:
  1. When we are creating a new branch we are using `pisp/` prefix in branch name. 
  2. We have `pisp/master` leading branch to keep our final feature candidate to be merged with `master`
  3. Newly created PR for every WIP branch should have `pisp/master` set as target
  4. When the new version of `master` is published (by other team for example), we should propagate all changes via merge with `pisp/master`
