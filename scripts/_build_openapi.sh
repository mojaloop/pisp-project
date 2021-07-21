#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH=${DIR}/../node_modules/.bin:$PATH

##
# Bundles, builds and validates openapi docs
##


echo $PATH

swagger-cli bundle -o ./src/interface/thirdparty-pisp-api.yaml -t yaml ./src/interface/thirdparty-pisp-api-template.yaml
# swagger-cli validate ./src/interface/thirdparty-pisp-api.yaml