#!/usr/bin/env bash


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}/../docker-local
docker-compose stop pisp-redis
docker-compose rm -f pisp-redis


docker-compose up -d