#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH=$(cd ${DIR} && npm bin):$PATH
POSTMAN_DIR="${DIR}/.."
NEWMAN_REQUEST_DELAY=${NEWMAN_REQUEST_DELAY:=100}

newman run \
  --delay-request=${NEWMAN_REQUEST_DELAY} \
  --folder='PISP-Initiate-TRX-Reqs-Tests' \
  ${POSTMAN_DIR}/PISP.postman_collection.json.postman_collection.json
