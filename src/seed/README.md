# ./seed

Seed contains TS scripts related to seeding pisp environments. 

For now, it is a simple port from the postman approach of seeding the database, for use in the `docker-live` k8s environment.

In the future, we may want to:
1. Use this tool to seed the `docker-local` environment
2. Spin off into a standalone tool for others in the Mojaloop Community


## TODO:
- unit testing + test coverage
- improve config tooling
- improve cli running - make it possible to just run one of the collections 
- fix hack where the `settlementAccountId` is hardcoded
