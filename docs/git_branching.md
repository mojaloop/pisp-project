## branch strategy:

  1. When we are creating a new branch we are using `pisp/` prefix in branch name. 
  2. We have `pisp/master` leading branch to keep our final feature candidate to be merged with `master`
  3. Newly created PR for every WIP branch should have `pisp/master` set as target
  4. When the new version of `master` is published (by other team for example), we should propagate all changes via merge with `pisp/master`
  
## PISP changes in other repos
   1. [#269](https://github.com/mojaloop/mojaloop/issues/269) POST /authorizations swagger changes in `mojaloop-specification` and `transaction-requests-service`
        - https://github.com/mojaloop/mojaloop-specification/commit/03d63c7d10c5a29a229d0ed8a5d92323489caeda
        - https://github.com/mojaloop/transaction-requests-service/commit/61196e5bab654c47cb3fe057b296778e5ee68782
        
