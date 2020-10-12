#!/usr/bin/env bash

set -e

# A super simple transfer from DFSPA -> DFSPB
# Currently stops at `WAITING_FOR_PARTY_ACCEPTANCE`
# but we just want to verify the endpoints are hooked up correctly
curl -s --request POST ${ELB_URL}/dfspa/mojaloop-simulator/test/scenarios \
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

