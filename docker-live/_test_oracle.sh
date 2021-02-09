#!/usr/bin/env bash

set -e

curl -s -X GET ${ELB_URL}/account-lookup-service/health
curl -s -X GET ${ELB_URL}/account-lookup-service-admin/health


# register the oracle
curl -s -X POST ${ELB_URL}/account-lookup-service-admin/oracles \
  -H 'Content-Type: application/json' \
  -H 'Date: 2021-02-09T03:07:11.718Z' \
  -d '{
      "oracleIdType": "CONSENT",
      "endpoint": {
          "value": "als-consent-oracle/oracle",
          "endpointType": "URL"
      },
      "currency": "USD",
      "isDefault": true
    }'

exit 0

# A super simple rough test of the Consents oracle
curl -s -X POST ${ELB_URL}/account-lookup-service/CONSENTS/ \
  --header 'Content-Type: application/json' \
  --data-raw '[
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
      "amount":  "100",
      "transactionType": "TRANSFER",
      "note": "Test note",
      "homeTransactionId": "123ABC"
          }
      }
  ]' | jq

