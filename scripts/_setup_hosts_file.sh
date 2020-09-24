#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

set -u
set -e

HOSTS_FILE=/etc/hosts
touch ${HOSTS_FILE}

if [ `cat ${HOSTS_FILE} | grep 'central-ledger.local' | wc -l`  -gt 0 ]; then
  echo "[WARN] Already found Mojaloop hosts in ${HOSTS_FILE}"
  echo "[WARN] exiting with status: 0"
  exit 0
fi

echo "
# Added by mojaloop
# to allow local access to mojaloop docker-compose environment
127.0.0.1       central-ledger.local central-settlement.local ml-api-adapter.local account-lookup-service.local account-lookup-service-admin.local quoting-service.local moja-simulator.local central-ledger central-settlement ml-api-adapter account-lookup-service account-lookup-service-admin quoting-service simulator host.docker.internal
127.0.0.1       dfspa-backend dfspb-backend pisp-backend dfspa-sdk-scheme-adapter dfspb-sdk-scheme-adapter pisp-sdk-scheme-adapter transaction-request-service
127.0.0.1       pisp-thirdparty-scheme-adapter-inbound pisp-thirdparty-scheme-adapter-outbound dfspa-thirdparty-scheme-adapter-inbound dfspa-thirdparty-scheme-adapter-outbound dfspb-thirdparty-scheme-adapter-inbound dfspb-thirdparty-scheme-adapter-outbound
# end of section
" >> ${HOSTS_FILE}

cat ${HOSTS_FILE}
