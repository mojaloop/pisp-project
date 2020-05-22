## branch strategy:

  1. When we are creating a new branch we are using `pisp/` prefix in branch name. 
  2. We have `pisp/master` leading branch to keep our final feature candidate to be merged with `master`
  3. Newly created PR for every WIP branch should have `pisp/master` set as target
  4. When the new version of `master` is published (by other team for example), we should propagate all changes via merge with `pisp/master`
  
## PISP changes in other Repos :
   1. POST /authorizations Swagger changes [#269](https://github.com/mojaloop/mojaloop/issues/269)
        - [mojaloop-specification](https://github.com/mojaloop/mojaloop-specification/commit/6ca00674e96990053926da29a2af3f07cf71b976)
        - [transaction-requests-service](https://github.com/mojaloop/transaction-requests-service/commit/05c6b822bbb53e5d7eac4003d3369e6c09b67459)
        
