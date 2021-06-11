#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}
# tolerate errors here, since postman collections are not idempotent
./_01_seed_hub_account.sh
set -e
set -u

# need to run settlement models towards beginning
./_12_seed_settlement_models.sh
./_02_seed_oracle.sh
./_03_seed_dfspa.sh
./_04_seed_dfspb.sh
./_05_seed_pisp.sh
./_13_seed_centralAuth.sh
./_06_seed_dfsp_simulator.sh
./_07_seed_dfsp_a_msisdn.sh
./_08_seed_dfsp_b_msisdn.sh
./_09_seed_dfsp_simulator_msisdn.sh
./_10_seed_pisp_msisdn.sh
./_11_seed_dfsp_backend_parties.sh
