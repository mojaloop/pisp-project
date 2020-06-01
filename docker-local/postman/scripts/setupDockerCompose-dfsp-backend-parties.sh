#!/usr/bin/env bash

PATH=$(npm bin):$PATH
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
POSTMAN_DIR="${DIR}/.."

newman run \
  --delay-request=2000 \
  --folder='Add parties to DFSP backends' \
  ${POSTMAN_DIR}/PISP.postman_collection.json.postman_collection.json
