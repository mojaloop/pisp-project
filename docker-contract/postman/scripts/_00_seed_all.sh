#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}
# tolerate errors here, since postman collections are not idempotent
./_01_seed_hub_account.sh
set -e
set -u

./_02_seed_oracle.sh
