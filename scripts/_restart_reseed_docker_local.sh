#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../docker-local

# Restart docker-local and reseed
docker-compose stop
docker-compose rm -f
docker-compose up -d
npm run wait-4-docker
npx ml-bootstrap@0.3.11 -c $DIR/../docker-local/ml-bootstrap-config.json5