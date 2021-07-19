# Local Mojaloop + Custom DFSP Test setup

The aim of this Document is to have a local mojaloop running with two customs DFSPs (backend plus sdk-adapter) and a PISP represented by a mojaloop simulator (which implements mojaloop api).

## Repo layout

Two custom DFSP & PISP configuration
- [`dfsp_a`](./dfsp_a)
- [`dfsp_b`](./dfsp_b)
- [`pisp`](./pisp)

Backend components
- [`docker`](./docker)

Integration tests
- [`postman`](./postman)

## Context, Parties, Backend components
The purpose of this setup is to run an example of mojaloop arrangement locally using docker-compose.

Services are composed in the testing layout as:

- _MojaloopHub_ is a set of microservices and their dependencies, including:
    - [central-ledger](https://github.com/mojaloop/central-ledger): (mysql, objstore (mongoDB), kafka)
    - [account-lookup-service](https://github.com/mojaloop/account-lookup-service) - als: (mysql-als)
    - [central-settlement](https://github.com/mojaloop/central-settlement): (mysql-als, kafka)
    - [quoting-service](https://github.com/mojaloop/quoting-service): (central-ledger, mysql-als, kafka)
    - [transaction-request-service](https://github.com/mojaloop/transaction-requests-service): (cental-ledger)
    - [ml-api-adapter](https://github.com/mojaloop/ml-api-adapter): wrapper to expose MojaloopHub
  > configuration folder: [docker](./docker)

- _PISP_  is a new party in Mojaloop system to represent Payment Initiate System Provider where its dependencies are:
    - pisp-backend: [mojaloop-simulator](https://github.com/mojaloop/mojaloop-simulator)
    - pisp-sdk-scheme-adapter: [scheme-adapter](https://github.com/mojaloop/sdk-scheme-adapter)
    - pisp-thirdparty-scheme-adapter: [thirdparty-scheme-adapter](https://github.com/mojaloop/thirdparty-scheme-adapter)
    - pisp-redis: redisDB
  > configuration folder: [pisp](./pisp)

- _DFSP A_ is a bank account holder
    - dfspa-backend: [mojaloop-simulator](https://github.com/mojaloop/mojaloop-simulator)
    - dfspa-sdk-scheme-adapter: [scheme-adapter](https://github.com/mojaloop/sdk-scheme-adapter)
    - dfspa-thirdparty-scheme-adapter: [thirdparty-scheme-adapter](https://github.com/mojaloop/thirdparty-scheme-adapter)
    - dfspa-redis: redisDB
  > configuration folder: [dfsp_a](./dfsp_a)

- _DFSP B_ is a bank account holder
    - dfspb-backend: [mojaloop-simulator](https://github.com/mojaloop/mojaloop-simulator)
    - dfspb-sdk-scheme-adapter: [scheme-adapter](https://github.com/mojaloop/sdk-scheme-adapter)
    - dfspb-thirdparty-scheme-adapter: [thirdparty-scheme-adapter](https://github.com/mojaloop/thirdparty-scheme-adapter)
    - dfspb-redis: redisDB
  > configuration folder: [dfsp_b](./dfsp_b)

![components](./components_layout.svg)

## Prerequisites
- `docker` - `v18.06.0` or higher
- `docker-compose`. We are using a compose file of `v3.7`. So you need at least `docker-compose` `v1.22`
- `node` and `npm`. We are using `node v12.16.1` at the time of writing
- `newman` You can install globally from npm if you want:
```bash
npm install -g newman
```

or you can install the `node_modules` in the root of this directory
```bash
npm install
```

- A hosts file with the following entries:
```
127.0.0.1       central-ledger.local central-settlement.local ml-api-adapter.local account-lookup-service.local account-lookup-service-admin.local quoting-service.local moja-simulator.local central-ledger central-settlement ml-api-adapter account-lookup-service account-lookup-service-admin quoting-service simulator host.docker.internal transaction-request-service
127.0.0.1 dfspa-backend dfspa-thirdparty-scheme-adapter-inbound dfspa-thirdparty-scheme-adapter-outbound dfspa-sdk-scheme-adapter
127.0.0.1 dfspb-backend dfspb-thirdparty-scheme-adapter-inbound dfspb-thirdparty-scheme-adapter-outbound dfspb-sdk-scheme-adapter
127.0.0.1 pisp-backend pisp-thirdparty-scheme-adapter-inbound pisp-thirdparty-scheme-adapter-outbound pisp-sdk-scheme-adapter
127.0.0.1 als-consent-oracle
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
docker-compose logs -f central-ledger
docker-compose logs -f quoting-service
docker-compose logs -f ml-api-adapter
docker-compose logs -f central-settlement
docker-compose logs -f account-lookup-service
docker-compose logs -f dfspa-sdk-scheme-adapter dfspa-backend dfspa-thirdparty-scheme-adapter-inbound dfspa-thirdparty-scheme-adapter-outbound
docker-compose logs -f dfspb-sdk-scheme-adapter dfspb-backend dfspb-thirdparty-scheme-adapter-inbound dfspb-thirdparty-scheme-adapter-outbound
docker-compose logs -f transaction-requests-service
docker-compose logs -f pisp-backend  pisp-sdk-scheme-adapter pisp-redis pisp-thirdparty-scheme-adapter-inbound pisp-thirdparty-scheme-adapter-outbound
```

## Create some initial data

### Set Up Seed Data

ml-bootstrap is a tool for seeding Mojaloop test environments. It replaces various postman collections and environments with a single tool and config file.

- Check out the [`ml-bootstrap-config.json5`](./ml-bootstrap-config.json5) file for a simple, unified place to configure this test environment.
- Read more about ml-bootstrap [here](https://github.com/vessels-tech/ml-bootstrap)


```bash
# from the docker-local directory
npx ml-bootstrap -c ./ml-bootstrap-config.json5
```

You can also use ml-bootstrap to run or rerun certain parts of the bootstrapping, eg.
```bash
# seed only hub config
npx ml-bootstrap -c ./ml-bootstrap-config.json5 hub

# Seed only participants
npx ml-bootstrap -c ./ml-bootstrap-config.json5 participants

# Seed only parties
npx ml-bootstrap -c ./ml-bootstrap-config.json5 parties
```

You can also specify a specific version of ml-boostrap:

```bash
npx ml-bootstrap@0.2.6 -c ./ml-bootstrap-config.json5
```

### Seed the ttk with demo OTP and Auth Token Data

```bash
# make sure you edit the rules.json file in the corresponding DFSP that user selects to
# contain the following authUri to redirect the user to
# "authUri": "http://localhost:26060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069"

# in this instance, we are pointing to the participant-list-service ttk... but you get the idea
export TTK_HOST=localhost:25000
export CONSENT_REQUEST_ID=b51ec534-ee48-4575-b6a9-ead2955b8069
./scripts/_configure_web_simulator.sh
```

### Handy Snippets

```bash
# check the parties registered at a simulator:
curl localhost:9003/repository/parties 

# expected response
# [{"displayName":"Alice Alpaca","firstName":"Alice","middleName":"K","lastName":"Alpaca","dateOfBirth":"1970-01-01","idType":"MSISDN","idValue":"123456789"}]
```

## P2P Examples

### 1. Transfer USD 100 from MSISDN 123456789 (DFSP A) to MSISDN 987654321 (DFSP B)

```bash
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

#### Response: Transfer was completed
```json
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

### 2. Transfer USD 90 from MSISDN 123456789 (DFSP A) to MSISDN 333333333 (Simulator)

```bash
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
          "idValue": "333333333"
      },
      "amountType": "SEND",
      "currency": "USD",
      "amount": "90",
      "transactionType": "TRANSFER",
      "note": "test",
      "homeTransactionId": "123ABC"
    }
  }
]'
```

## PISP Transaction Request Examples


### 1. `POST /requestToPay`

> Note: The HTTP request `POST /requestToPay` has two stages, (1) Party Lookup and (2) Initiate Transaction Request

```bash
curl -v  -X  POST http://localhost:7002/requestToPay  -H  'Content-Type: application/json'  -d  '{
    "homeTransactionId": "f0cf62e7-fb15-46a5-9525-37f934d98fcd",
    "from": {
        "idType": "MSISDN",
        "idValue": "987654321"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "18",
    "scenario":"PAYMENT",
    "initiator":"PAYEE",
    "initiatorType":"BUSINESS",
    "note": "pisp test payment"
}'
```

##### `POST /requestToPay` Response:
````json
{
    "homeTransactionId": "f0cf62e7-fb15-46a5-9525-37f934d98fcd",
    "from": {
        "idType": "MSISDN",
        "idValue": "987654321",
        "fspId": "pisp"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "123456789",
        "fspId": "dfspa",
        "firstName": "Alice",
        "middleName": "K",
        "lastName": "Alpaca",
        "dateOfBirth": "1970-01-01"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "18",
    "scenario": "PAYMENT",
    "initiator": "PAYEE",
    "initiatorType": "BUSINESS",
    "note": "pisp test payment",
    "transactionRequestId": "70c522c9-0880-40b1-b28f-0c567e0b39aa",
    "currentState": "COMPLETED",
    "requestToPayState": "RECEIVED"
}
````

### 2. `POST /requestToPayTransfer`

> The HTTP request `POST /requestToPayTransfer` is used to request the movement of funds from payer DFSP to payee DFSP.
> The underlying Mojaloop API has three stages for money transfer: (1) Quotation, (2) Authorization and (3) Transfer

```bash
curl -v  -X  POST http://localhost:5002/requestToPayTransfer  -H  'Content-Type: application/json' -d '{
  "requestToPayTransactionId": "70c522c9-0880-40b1-b28f-0c567e0b39aa",
  "from": {
    "idType": "MSISDN",
    "idValue": "123456789"
  },
  "to": {
    "idType": "MSISDN",
    "idValue": "987654321",
    "fspId":"dfspb"
  },
  "amountType": "SEND",
  "currency": "USD",
  "amount": "18",
  "scenario":"PAYMENT",
  "initiator":"PAYEE",
  "initiatorType":"BUSINESS",
  "note": "pisp test payment"
}'
```

##### `POST /requestToPayTransfer` Response:
```json
{
    "requestToPayTransactionId": "70c522c9-0880-40b1-b28f-0c567e0b39aa",
    "from": {
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "987654321",
        "fspId": "dfspb"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "18",
    "scenario": "PAYMENT",
    "initiator": "PAYEE",
    "initiatorType": "BUSINESS",
    "note": "pisp test payment",
    "transferId": "ab3532c6-7ca3-461d-b2b9-4235085e7f6e",
    "currentState": "WAITING_FOR_QUOTE_ACCEPTANCE",
    "quoteId": "17467236-b6fe-4487-b21d-db9d37fd9128",
    "quoteResponse": {
        "transferAmount": {
            "amount": "18",
            "currency": "USD"
        },
        "expiration": "2020-05-12T09:26:13.967Z",
        "ilpPacket": "<removed for brevity>",
        "payeeFspFee": {
            "amount": "0",
            "currency": "USD"
        },
        "payeeFspCommission": {
            "amount": "0",
            "currency": "USD"
        }
    },
    "quoteResponseSource": "dfspb"
}
```

### 3. `POST /requestToPayTransfer/{requestToPayTransactionId}:`

>The HTTP request `POST /requestToPayTransfer/{requestToPayTransactionId}` is used to Continues a transfer that has paused at the authorization stage in order to accept quote

```bash
curl -v  -X  \ POST http://localhost:5002/requestToPayTransfer/70c522c9-0880-40b1-b28f-0c567e0b39aa  -H  'Content-Type: application/json'  -d  '{
       "acceptQuote": true
}'

```
##### `POST /requestToPayTransfer/{requestToPayTransactionId}` Response:
```json
{
    "requestToPayTransactionId": "70c522c9-0880-40b1-b28f-0c567e0b39aa",
    "from": {
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "987654321",
        "fspId": "dfspb"
    },
    "amountType": "SEND",
    "currency": "USD",
    "amount": "18",
    "scenario": "PAYMENT",
    "initiator": "PAYEE",
    "initiatorType": "BUSINESS",
    "note": "pisp test payment",
    "transferId": "ab3532c6-7ca3-461d-b2b9-4235085e7f6e",
    "currentState": "COMPLETED",
    "quoteId": "17467236-b6fe-4487-b21d-db9d37fd9128",
    "quoteResponse": {
        "transferAmount": {
            "amount": "18",
            "currency": "USD"
        },
        "expiration": "2020-05-12T09:26:13.967Z",
        "ilpPacket": "<removed for brevity>",
        "payeeFspFee": {
            "amount": "0",
            "currency": "USD"
        },
        "payeeFspCommission": {
            "amount": "0",
            "currency": "USD"
        }
    },
    "quoteResponseSource": "dfspb",
    "fulfil": {
        "completedTimestamp": "2020-05-12T09:25:27.227Z",
        "transferState": "COMMITTED",
        "fulfilment": "PjQaZGeBajwGGv-Oqa2F-gYX21ngMVJZOLc6hxNDS74"
    }
}
```


#### Simple FSPIOP Calls

```bash
# create party
curl -X POST localhost:4002/participants/MSISDN/123456789 \
  -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
  -H 'FSPIOP-Source: dfspa' \
  -H 'Date: 2021-01-01' \
  -d '{ 
      "fspId": "dfspa",
      "currency": "USD"
  }'


# party lookup
curl -v localhost:4002/parties/MSISDN/987654321 \
  -H 'Accept: application/vnd.interoperability.parties+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.parties+json;version=1.0' \
  -H 'FSPIOP-Source: dfspa' \
  -H 'Date: 2021-01-01'


# Update auth-service with consent
curl -v -X POST localhost:26000/consents \
    -H 'content-type application/vnd.interoperability.thirdparty+json;version=1.0'\
    -H 'date: Fri, 18 Jun 2021 05:22:03 GMT'\
    -H 'fspiop-source: dfspa'\
    -H 'fspiop-destination: centralAuth'\
    -H 'accept: application/vnd.interoperability.thirdparty+json;version=1' \
    -d '{
        "consentId": "d3f2e02c-10f4-4f90-9da7-9f8e3714f393",
        "scopes": [
            {
            "accountId": "dfspa.username.1234",
            "actions": [
                "accounts.getBalance",
                "accounts.transfer"
            ]
            },
            {
            "accountId": "dfspa.username.5678",
            "actions": [
                "accounts.getBalance",
                "accounts.transfer"
            ]
            }
        ],
    }'


# create a participant entry with the ALS
curl -v -X POST localhost:4002/participants/CONSENT/123456789 \
      -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
    -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
    -H 'date: Fri, 18 Jun 2021 05:22:03 GMT'\
    -H 'fspiop-source: centralAuth'\
    -d '{
        "fspId": "centralAuth"
    }'


# Check the participants with the ALS Consent Oracle
curl -v localhost:16000/participants/CONSENT/81ca21ce-ad62-4e8c-a321-f21cad2bc28b \
  -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
  -H 'FSPIOP-Source: als' \
  -H 'Date: 2021-01-01'


# Test calling the Auth-Service from the DFSP
curl -X POST localhost:26000/consents\
  -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
  -H 'FSPIOP-Source: dfspa' \
  -H 'FSPIOP-Destination: centralAuth' \
  -H 'Date: 2021-01-01'\
  -d '{
    "consentId": "71fc944e-519d-48f1-af2b-26670e6c9d41",
    "scopes": [
      {
        "accountId": "dfspa.username.1234",
        "actions": [ "accounts.transfer"]
      },
      {
        "actions": ["accounts.transfer"  ],
        "accountId": "dfspa.username.5678"
      }
    ],
    "credential": {
      "payload": {
        "type": "public-key",
        "rawId": "bgKpdUZgkf3Emp+i6cjdk6rCMYY1Icb1+Z9TdMZq03VAbceSX5Hp/54NEj1AV776QXJufRSU3DLWpaLHa+T1bQ==",
        "response": {
          "attestationObject": "o2NmbXRmcGFja2VkZ2F0dFN0bXSjY2FsZyZjc2lnWEcwRQIgbeVMNz1IQjNvEvRNIwnfhD9FXypX6A/SlvVR05oijlwCIQDjvmoHwjRQOJJrUU+cWvOVteEh1lXv022wPF40ytjsDmN4NWOBWQLBMIICvTCCAaWgAwIBAgIECwXNUzANBgkqhkiG9w0BAQsFADAuMSwwKgYDVQQDEyNZdWJpY28gVTJGIFJvb3QgQ0EgU2VyaWFsIDQ1NzIwMDYzMTAgFw0xNDA4MDEwMDAwMDBaGA8yMDUwMDkwNDAwMDAwMFowbjELMAkGA1UEBhMCU0UxEjAQBgNVBAoMCVl1YmljbyBBQjEiMCAGA1UECwwZQXV0aGVudGljYXRvciBBdHRlc3RhdGlvbjEnMCUGA1UEAwweWXViaWNvIFUyRiBFRSBTZXJpYWwgMTg0OTI5NjE5MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIRpvsbWJJcsKwRhffCrjqLSIEBR5sR7/9VXgfZdRvSsXaiUt7lns44WZIFuz6ii/j9f8fadcBUJyrkhY5ZH8WqNsMGowIgYJKwYBBAGCxAoCBBUxLjMuNi4xLjQuMS40MTQ4Mi4xLjEwEwYLKwYBBAGC5RwCAQEEBAMCBDAwIQYLKwYBBAGC5RwBAQQEEgQQFJogIY72QTOWuIH41bfx9TAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQA+/qPfPSrgclePfgTQ3VpLaNsBr+hjLhi04LhzQxiRGWwYS+vB1TOiPXeLsQQIwbmqQU51doVbCTaXGLNIr1zvbLAwhnLWH7i9m4ahCqaCzowtTvCQ7VBUGP5T1M4eYnoo83IDCVjQj/pZG8QYgOGOigztGoWAf5CWcUF6C0UyFbONwUcqJEl2QLToa/7E8VRjm4W46IAUljYkODVZASv8h3wLROx9p5TSBlSymtwdulxQe/DKbfNSvM3edA0up+EIJKLOOU+QTR2ZQV46fEW1/ih6m8vcaY6L3NW0eYpc7TXeijUJAgoUtya/vzmnRAecuY9bncoJt8PrvL2ir2kDaGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj+SuuaKGMseZXPO6gx2XY0EAAAAEFJogIY72QTOWuIH41bfx9QBAbgKpdUZgkf3Emp+i6cjdk6rCMYY1Icb1+Z9TdMZq03VAbceSX5Hp/54NEj1AV776QXJufRSU3DLWpaLHa+T1baUBAgMmIAEhWCDPYbC9sE7AqtUUqjK0uwygXpv4CDhC+KMiO0/V46ZvIiJYIIXAJfywupD7z73ClG5h7vkWyaxfAru2LtT4Gl+NAc7K",
          "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiWWdCa0FHUUFNd0F4QUdFQU9RQmxBR1VBWVFBd0FHWUFOd0ExQURRQU53QXlBRFVBTUFCa0FHRUFNQUF3QURFQVpRQmhBR0VBT1FBeEFETUFZUUF3QUdZQU5RQTVBRGtBT1FBNEFEY0FZd0EyQURNQU5nQmhBR0lBWlFBeUFHTUFNZ0F6QURRQU5BQXhBRFFBWmdCakFHSUFNQUJoQURVQU5nQmlBRFlBTkFBIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDo0MjE4MSIsImNyb3NzT3JpZ2luIjpmYWxzZX0="
        },
        "id": "bgKpdUZgkf3Emp-i6cjdk6rCMYY1Icb1-Z9TdMZq03VAbceSX5Hp_54NEj1AV776QXJufRSU3DLWpaLHa-T1bQ"
      },
      "status": "PENDING",
      "credentialType": "FIDO"
    }
  }'


# Start a 3rd party transaction request
curl -X POST localhost:12000/thirdpartyRequests/transactions \
  -H 'Accept: application/vnd.interoperability.thirdparty+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.thirdparty+json;version=1.0' \
  -H 'FSPIOP-Source: pineapplepay' \
  -H 'FSPIOP-Destination: applebank' \
  -H 'Date: 2021-01-01'\
  -d '{
    "transactionRequestId": "02e28448-3c05-4059-b5f7-d518d0a2d8ea",
      "payee": {
        "personalInfo": {
          "dateOfBirth": "1970-01-01",
          "complexName": {
            "lastName": "Babirusa",
            "firstName": "Bob",
            "middleName": "O"
          }
        },
        "name": "Billy Bairus",
        "partyIdInfo": {
          "fspId": "dfspb",
          "partyIdentifier": "255255255255",
          "partyIdType": "MSISDN"
        }
      },
      "payer": {
        "partyIdType": "THIRD_PARTY_LINK",
        "partyIdentifier": "1234-1234-1234-1234"
      },
      "amountType": "RECEIVE",
      "amount": {
        "currency": "TZS",
        "amount": "12"
      },
      "transactionType": {
        "scenario": "TRANSFER",
        "initiator": "PAYER",
        "initiatorType": "CONSUMER"
      },
      "expiration": "1970-01-01T00:00:00.029Z",
      "sourceAccountId": "1234-1234-1234-1234",
      "consentId": "b51ec534-ee48-4575-b6a9-ead2955b8069"
  }'


#DFSP's response to a 3rd party transaction request
  -H 'Accept: application/vnd.interoperability.thirdparty+json;version=1' \
curl -v -X PUT localhost:12000/thirdpartyRequests/transactions/02e28448-3c05-4059-b5f7-d518d0a2d8ea \
  -H 'Accept:' \
  -H 'Content-Type: application/vnd.interoperability.thirdparty+json;version=1.0' \
  -H 'FSPIOP-Source: dfspa' \
  -H 'FSPIOP-Destination: pineapplepay' \
  -H 'Date: 2021-01-01'\
  -d '{
    "transactionId": "e1a60f05-1c1b-4d9f-bcd9-3822ebad29d5",
    "transactionRequestState": "RECEIVED"
  }'

```