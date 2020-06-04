# Contract tests between PISP Simulator and ml-testing-toolkit

The aim of this document is to configure API contract tests between the PISP simulator and ml-testing-toolkit, so that we can have a reliable interface between PISPs and Mojaloop.

## Repo layout

 PISP Simulator and mojaloop-testing-toolkit configuration
- [`mojaloop-testing-toolkit`](./mojaloop-testing-toolkit)
- [`pisp-sim`](./pisp-sim)

## Services and Backend components
   The purpose of this setup is to run contract tests between the PISP simulator and ml-testing-toolkit using docker-compose.

   Services are composed in the testing layout as:

- [_ml-testing-toolkit_](https://github.com/mojaloop/ml-testing-toolkit) :  Mojaloop Testing Toolkit is a standard integration testing tool between a Digital Financial Service Provider (DFSP) and the Mojaloop Switch (Hub), to facilitate testing. This tool set can potentially be used by both the DFSP and the Mojaloop Switch to verify the integration between the 2 entities.
- [_ml-testing-toolkit-ui_](https://github.com/mojaloop/ml-testing-toolkit-ui) : This is front end application(Web UI) to access Mojaloop Testing Toolkit.
- _PISP-SIM_ :  It is customized mojaloop-simulator to represent Payment Initiate System Provider where its dependencies are:
    - pisp-backend: [mojaloop-simulator](https://github.com/mojaloop/mojaloop-simulator/tree/pisp/master)
    - pisp-scheme-adapter: [scheme-adapter](https://github.com/mojaloop/sdk-scheme-adapter/tree/pisp/master)
    - pisp-redis: redisDB
  > configuration folder: [pisp](./pisp-sim)

![components](./components_layout.png)
## Prerequisites
- `docker` - `v18.06.0` or higher
- `docker-compose`. We are using a compose file of `v3.7`. So you need at least `docker-compose` `v1.22`
- `node` and `npm`. We are using `node v12.16.1` at the time of writing

- Update hosts file with the following entries:
```
127.0.0.1  mojaloop-testing-toolkit
```

## Start services using `docker-compose`

```bash
# start all services in background
docker-compose up -d

# Check to see if they are running and healthy
docker-compose ps
```
It may take a little while for the services to healthy.

### Logging:

Use `docker-compose logs -f` to tail the logs of any given container. 

You may want to do this in separate terminal sessions to easily debug each service.

```bash
docker-compose logs -f mojaloop-testing-toolkit
docker-compose logs -f ml-testing-toolkit-ui
docker-compose logs -f pisp-backend pisp-scheme-adapter pisp-redis
```
## Run Contract Tests

```bash
# Run the contract tests
cd ./docker-contract
npm run test:contract
```
> Note: You can also invoke these tests using Jest's  `watch` mode:
```bash
npm run test:contract -- --watch
```
```bash
 PASS  test/contract/PostAuthorizations.test.ts
  POST Authorizations Tests
    ✓ Test post /authorizations request (38 ms)

 PASS  test/contract/P2PTransfer.test.ts
  Peer to Peer transfer
    ✓ Performs a P2P transfer from Alice -> Bob (667 ms)

 PASS  test/contract/PISPTransfer.test.ts
  PISP initiated transfer
    1. PISP GET /parties & /transactionRequests
      ✓ initites the transaction request (486 ms)
    2. PISP POST /quotes
      ✓ creates the quote (218 ms)

Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.282 s, estimated 3 s
Ran all test suites.
```