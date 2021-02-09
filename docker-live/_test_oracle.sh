#!/usr/bin/env bash

set -e

ORACLE_ID_TYPE=ORACLE

curl -s -X GET ${ELB_URL}/account-lookup-service/health
curl -s -X GET ${ELB_URL}/account-lookup-service-admin/health
echo ''

# register the oracle
curl -s -X POST ${ELB_URL}/account-lookup-service-admin/oracles \
  -H 'Content-Type: application/json' \
  -H 'Date: 2021-02-09T03:07:11.718Z' \
  -d '{
      "oracleIdType": "'$ORACLE_ID_TYPE'",
      "endpoint": {
          "value": "als-consent-oracle/oracle",
          "endpointType": "URL"
      },
      "currency": "USD",
      "isDefault": true
    }'

echo ''

# A super simple rough test of the Consents oracle
# change ORACLE_ID_TYPE to MSISDN for a proper test, since
# since the ALS doesn't like the `CONSENTS` type
# TODO - fix in mojaloop/project#2015
curl -s -X POST $ELB_URL/account-lookup-service/participants/$ORACLE_ID_TYPE/123 \
  -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
  -H 'Date: 2021-02-09T03:07:11.718Z' \
  -H 'FSPIOP-Source: dfspa' \
  -d '{
      "fspId": "dfspa"
  }'

curl -s -X GET $ELB_URL/account-lookup-service/participants/$ORACLE_ID_TYPE/123 \
  -H 'Accept: application/vnd.interoperability.participants+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.participants+json;version=1.0' \
  -H 'Date: 2021-02-09T03:07:11.718Z' \
  -H 'FSPIOP-Source: dfspa'

echo 'Not monitoring endpoints here... go and check the logs yourself to check the callbacks'