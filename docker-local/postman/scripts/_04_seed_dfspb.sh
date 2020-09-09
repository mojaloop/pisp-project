#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH=$(cd ${DIR} && npm bin):$PATH
POSTMAN_DIR="${DIR}/.."
NEWMAN_REQUEST_DELAY=${NEWMAN_REQUEST_DELAY:=100}

newman run \
  --delay-request=${NEWMAN_REQUEST_DELAY} \
  --folder='payeefsp (p2p transfers)' \
  --environment=${POSTMAN_DIR}/environments/Mojaloop-Local-Docker-Compose.postman_environment_DFSP_PAYEE.json \
  ${POSTMAN_DIR}/OSS-New-Deployment-FSP-Setup-DFSPS.postman_collection.json
