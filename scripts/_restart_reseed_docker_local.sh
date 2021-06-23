#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../docker-local

# Restart docker-local and reseed
docker-compose stop
docker-compose rm -f
docker-compose up -d
npm run wait-4-docker
npx ml-bootstrap@0.3.11 -c $DIR/../docker-local/ml-bootstrap-config.json5

# configure the web simulator
export CONSENT_REQUEST_ID=b51ec534-ee48-4575-b6a9-ead2955b8069
$DIR/_configure_web_simulator.sh