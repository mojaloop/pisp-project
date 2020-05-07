# Local Mojaloop + Custom DFSP Test setup

The aim of this Document is to have a local mojaloop running with two customs DFSPs (backend plus sdk-adapter) and a PISP represented by a mojaloop simulator (which implements mojaloop api).


## Create host

* Add to /etc/hosts
```
127.0.0.1       central-ledger.local central-settlement.local ml-api-adapter.local account-lookup-service.local account-lookup-service-admin.local quoting-service.local moja-simulator.local central-ledger central-settlement ml-api-adapter account-lookup-service account-lookup-service-admin quoting-service simulator host.docker.internal
```

## Start the compose


```
Running the services separately in terminals is recommended

Run docker-compose up account-lookup-service then close once the service is ready. Proceed to stop account-lookup-service and proceed with the following commands.
ALS needs to be run initially so it setups properly.

docker-compose up central-ledger
docker-compose up quoting-service
docker-compose up ml-api-adapter
docker-compose up central-settlement
docker-compose up account-lookup-service
docker-compose up dfspa-scheme-adapter dfspa-backend
docker-compose up dfspb-scheme-adapter dfspb-backend
```

We need to check if account-services is running for that reason we'll execute this health request

```
curl -X GET http://account-lookup-service:4002/health
```

If this response is "OK", we can continue with the next step otherwise we need to down this service and start it again

```
docker-compose stop  account-lookup-service
```

```
docker-compose start  account-lookup-service
```


## Create some initial data

### Prerequisites

* Install newman

```
npm install -g newman
```

* cd to the postman folder

* Use this to run all the scripts

```
sh scripts/setupDockerCompose-FullSetup.sh
```

* Setup hub account

```
sh scripts/setupDockerCompose-HubAccount.sh
```

```
OSS-New-Deployment-FSP-Setup

❏ Hub Account
↳ Add Hub Account-HUB_MULTILATERAL_SETTLEMENT
  POST http://central-ledger.local:3001/participants/Hub/accounts [201 Created, 511B, 6.2s]
  ✓  Status code is 201

↳ Add Hub Account-HUB_RECONCILIATION
  POST http://central-ledger.local:3001/participants/Hub/accounts [201 Created, 654B, 78ms]
  ✓  Status code is 201

↳ Hub Set Endpoint-SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL Copy
  POST http://central-ledger.local:3001/participants/hub/endpoints [201 Created, 129B, 29ms]
  ✓  Status code is 201

↳ Hub Set Endpoint-NET_DEBIT_CAP_ADJUSTMENT_EMAIL Copy
  POST http://central-ledger.local:3001/participants/hub/endpoints [201 Created, 129B, 35ms]
  ✓  Status code is 201

↳ Hub Endpoint-NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL Copy
  POST http://central-ledger.local:3001/participants/Hub/endpoints [201 Created, 129B, 38ms]
  ✓  Status code is 201

┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│                requests │                  5 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│            test-scripts │                 10 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│      prerequest-scripts │                  5 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│              assertions │                  5 │                 0 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 17.2s                                        │
├──────────────────────────────────────────────────────────────────┤
│ total data received: 809B (approx)                               │
├──────────────────────────────────────────────────────────────────┤
│ average response time: 1278ms [min: 29ms, max: 6.2s, s.d.: 2.5s] │
└──────────────────────────────────────────────────────────────────┘
```

```
sh scripts/setupDockerCompose-OracleOnboarding.sh
```

```
OSS-New-Deployment-FSP-Setup

❏ Oracle Onboarding
↳ Register Simulator Oracle for MSISDN
  POST http://account-lookup-service-admin.local:4001/oracles [201 Created, 213B, 5.2s]

┌─────────────────────────┬──────────────────┬──────────────────┐
│                         │         executed │           failed │
├─────────────────────────┼──────────────────┼──────────────────┤
│              iterations │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│                requests │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│            test-scripts │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│      prerequest-scripts │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│              assertions │                0 │                0 │
├─────────────────────────┴──────────────────┴──────────────────┤
│ total run duration: 7.5s                                      │
├───────────────────────────────────────────────────────────────┤
│ total data received: 0B (approx)                              │
├───────────────────────────────────────────────────────────────┤
│ average response time: 5.2s [min: 5.2s, max: 5.2s, s.d.: 0µs] │
```


### Create DFSP A (use SDK + backend)

It will create a new participant with its endpoints and some init data. For this case, name, position, and limits will be

| Parameter | Value |
|-----------|---------|
| `name`       | `dfspa`  |
| `currency`       | `USD`  |
| `limit.type`       | `NET_DEBIT_CAP` |
| `limit.value`   | `1000000` |
| `initialPosition`     | `0` |`

```
$ sh scripts/setupDockerCompose-dfspa.sh`
```

### Create DFSP B(use SDK + backend)

It will create a new participant with its endpoints and some init data. For this case, name, position, and limits will be

| Parameter | Value |
|-----------|---------|
| `name`       | `dfspb`  |
| `currency`       | `USD`  |
| `limit.type`       | `NET_DEBIT_CAP` |
| `limit.value`   | `1000000` |
| `initialPosition`     | `0` |`

```
$ sh scripts/setupDockerCompose-DFSP-B.sh
```

### Create a Simulator DFSP (implement mojaloop api)

It will create a new participant with its endpoints and some init data. For this case, name, position, and limits will be

| Parameter | Value |
|-----------|---------|
| `name`       | `payeefsp`  |
| `currency`       | `USD`  |
| `limit.type`       | `NET_DEBIT_CAP` |
| `limit.value`   | `1000000` |
| `initialPosition`     | `0` |`

```
$ sh scripts/setupDockerCompose-DFSP-SIMULATOR.sh
```

### Add MSISDN (123456789) for DFSP A

Register a new MSISDN for this dfsp with this initial data

| Parameter | Value |
|-----------|---------|
| `currency`       | `USD`  |


```
$ sh scripts/setupDockerCompose-dfspa-MSISDN.sh
```

### Add MSISDN (987654321) for DFSP B

Register a new MSISDN for this dfsp with this initial data

| Parameter | Value |
|-----------|---------|
| `currency`       | `USD`  |

```
$ sh scripts/setupDockerCompose-DFSP-B-MSISDN.sh
```

### Add MSISDN (333333333) for Simulator

Register a new MSISDN for this dfsp with this initial data

| Parameter | Value |
|-----------|---------|
| `currency`       | `USD`  |

```
$ sh scripts/setupDockerCompose-DFSP-SIMULATOR-MSISDN.sh
```

### Add parties to the backend's of DFSP A and DFSP B.


```
$ sh scripts/setupDockerCompose-dfsp-backend-parties.sh
```

### If you restart docker compose you'll need to re-run this command to setup ALS

```
sh scripts/setupDockerCompose-DFSP-B-MSISDN.sh && sh scripts/setupDockerCompose-DFSP-A-MSISDN.sh
```

## Examples

* Transfer USD 100 from MSIDNS 123456789 (DFSP A) to MSIDNS 987654321 (DFSP B)

```
curl -v -X POST http://localhost:9003/scenarios   -H 'Content-Type: application/json'  -d '[
    {
        "name": "scenario1",
        "operation": "postTransfers",
        "body": {
            "from": {
                "idType": "MSISDN",
                "idValue": "123456789"
            },
            "to": {
                "idType": "MSISDN",
                "idValue": "987654321"
            },
            "amountType": "SEND",
            "currency": "USD",
            "amount": "100",
            "transactionType": "TRANSFER",
            "note": "Test note",
            "homeTransactionId": "123ABC"
        }
    }
]'
```

### Response: Transfer was completed
```
{
    "scenario1": {
        "result": {
            "from": {
                "idType": "MSISDN",
                "idValue": "123456789"
            },
            "to": {
                "idType": "MSISDN",
                "idValue": "987654321",
                "fspId": "dfspb",
                "firstName": "Bob",
                "middleName": "O",
                "lastName": "Babirusa",
                "dateOfBirth": "1970-01-01"
            },
            "amountType": "SEND",
            "currency": "USD",
            "amount": "100",
            "transactionType": "TRANSFER",
            "note": "Test note",
            "homeTransactionId": "123ABC",
            "transferId": "b3566a13-a80a-463e-8f7e-dea718a1c97d",
            "currentState": "COMPLETED",
            "quoteId": "69ab32ba-5cbe-4640-8399-565a6763b557",
            "quoteResponse": {
                "transferAmount": {
                    "amount": "100",
                    "currency": "USD"
                },
                "expiration": "2020-05-06T21:17:34.779Z",
                "ilpPacket": "AYIC-wAAAAAAACcQGGcuZGZzcGIubXNpc2RuLjk4NzY1NDMyMYIC1mV5SjBjbUZ1YzJGamRHbHZia2xrSWpvaVlqTTFOalpoTVRNdFlUZ3dZUzAwTmpObExUaG1OMlV0WkdWaE56RTRZVEZqT1Rka0lpd2ljWFZ2ZEdWSlpDSTZJalk1WVdJek1tSmhMVFZqWW1VdE5EWTBNQzA0TXprNUxUVTJOV0UyTnpZellqVTFOeUlzSW5CaGVXVmxJanA3SW5CaGNuUjVTV1JKYm1adklqcDdJbkJoY25SNVNXUlVlWEJsSWpvaVRWTkpVMFJPSWl3aWNHRnlkSGxKWkdWdWRHbG1hV1Z5SWpvaU9UZzNOalUwTXpJeElpd2labk53U1dRaU9pSmtabk53WWlKOUxDSndaWEp6YjI1aGJFbHVabThpT25zaVkyOXRjR3hsZUU1aGJXVWlPbnNpWm1seWMzUk9ZVzFsSWpvaVFtOWlJaXdpYldsa1pHeGxUbUZ0WlNJNklrOGlMQ0pzWVhOMFRtRnRaU0k2SWtKaFltbHlkWE5oSW4wc0ltUmhkR1ZQWmtKcGNuUm9Jam9pTVRrM01DMHdNUzB3TVNKOWZTd2ljR0Y1WlhJaU9uc2ljR0Z5ZEhsSlpFbHVabThpT25zaWNHRnlkSGxKWkZSNWNHVWlPaUpOVTBsVFJFNGlMQ0p3WVhKMGVVbGtaVzUwYVdacFpYSWlPaUl4TWpNME5UWTNPRGtpTENKbWMzQkpaQ0k2SW1SbWMzQmhJbjE5TENKaGJXOTFiblFpT25zaVlXMXZkVzUwSWpvaU1UQXdJaXdpWTNWeWNtVnVZM2tpT2lKVlUwUWlmU3dpZEhKaGJuTmhZM1JwYjI1VWVYQmxJanA3SW5OalpXNWhjbWx2SWpvaVZGSkJUbE5HUlZJaUxDSnBibWwwYVdGMGIzSWlPaUpRUVZsRlVpSXNJbWx1YVhScFlYUnZjbFI1Y0dVaU9pSkRUMDVUVlUxRlVpSjlmUQA",
                "condition": "DOD2qgwCJuMIIzrGmZfJ7GDVPmr2xoBmkrBoRT9ourU",
                "payeeFspFee": {
                    "amount": "5",
                    "currency": "USD"
                },
                "payeeFspCommission": {
                    "amount": "5",
                    "currency": "USD"
                }
            },
            "quoteResponseSource": "dfspb",
            "fulfil": {
                "completedTimestamp": "2020-05-06T21:16:34.871Z",
                "transferState": "COMMITTED",
                "fulfilment": "H_Xod2AWCi2H0aCqkBTrPaU63BH_9n6Rca57O8Qgjkk"
            }
        }
    }
}
```

* Transfer USD 90 from MSIDNS 123456789 (DFSP A) to MSIDNS 333333333 (Simulator)

```
curl -v -X POST http://localhost:10000/send   -H 'Content-Type: application/json'  -d '{
    "from": {
        "displayName": "Livia",
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "333333333"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "90",
    "transactionType": "TRANSFER",
    "note": "test",
    "homeTransactionId": "123ABC"
}'
```

* WIP transaction requests

```
curl -v -X POST http://localhost:8444/transactionRequests -H 'FSPIOP-Source: dfspa' -H 'FSPIOP-Destination: dfspb' -H 'Date: Sat, 25 Apr 2020 19:08:07 GMT'  -H 'Content-Type: application/vnd.interoperability.parties+json;version=1.0' -H 'Accept: application/vnd.interoperability.parties+json;version=1' -H ''  -d '{
    "payee": {
      "partyIdInfo": {
          "partyIdType": "MSISDN",
          "partyIdentifier": "123456789",
          "fspId":"dfspa"
      }
    },
    "payer": {
        "partyIdType": "MSISDN",
        "partyIdentifier": "987654321",
        "fspId": "dfspb"
    },
    "amount": {
        "currency": "USD",
        "amount": "123.45"
    },
    "transactionType": {
        "scenario": "TRANSFER",
        "subScenario": "CUSTOM_SUBSCENARIO",
        "initiator": "PAYEE",
        "initiatorType": "CONSUMER",
        "refundInfo": {
            "originalTransactionId": "25a00155-c777-4629-a6b7-61cf0d16f490",
            "refundReason": "free text indicating reason for the refund"
        },
        "balanceOfPayments": "123"
    },
    "note": "test",
    "transactionRequestId": "25a00155-c777-4629-a6b7-62cf0d16f499",
    "expiration": "2020-04-26T17:50:09.474Z"
}'
```
