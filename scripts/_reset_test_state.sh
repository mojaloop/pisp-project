#!/usr/bin/env bash


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# A little utility that resets the test state to make 
# writing e2e tests easier

cd ${DIR}/../docker-local
# Reset the redis cache so we can reuse the same transactionRequestIds etc.
docker-compose stop pisp-redis dfspa-redis 
docker-compose rm -f pisp-redis dfspa-redis

# reset the databases 
docker exec -it auth-service-mysql mysql -D auth-service -e 'SET FOREIGN_KEY_CHECKS=0;truncate Consent; truncate Scope; SET FOREIGN_KEY_CHECKS=1; select * from Consent;'
docker exec -it als-consent-oracle-mysql mysql -D als-consent-oracle -e 'truncate Consent;'

docker-compose up -d