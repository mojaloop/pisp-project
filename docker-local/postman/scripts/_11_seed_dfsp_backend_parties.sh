#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH=$(cd ${DIR} && npm bin):$PATH
POSTMAN_DIR="${DIR}/.."

newman run \
  --delay-request=2000 \
  --folder='Add parties to DFSP backends' \
  ${POSTMAN_DIR}/PISP.postman_collection.json.postman_collection.json
