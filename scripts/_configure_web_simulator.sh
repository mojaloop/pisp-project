#!/usr/bin/env bash

TTK_HOST=${TTK_HOST:-localhost:15000}
CONSENT_REQUEST_ID=${CONSENT_REQUEST_ID:-3b346cec-47b3-4def-b870-edb255aaf6c3}

echo "CONSENT_REQUEST_ID is: ${CONSENT_REQUEST_ID}"


# Populate a list of demo accounts
curl -X POST "http://${TTK_HOST}/store/consentRequests/${CONSENT_REQUEST_ID}" \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '
  {
    "scopes": [
        {
            "accountId": "dfspa.username.1234",
            "actions": [
                "accounts.transfer",
                "accounts.getBalance"
            ]
        },
        {
            "accountId": "dfspa.username.5678",
            "actions": [
                "accounts.transfer",
                "accounts.getBalance"
            ]
        }
    ]
  }'
