#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

${DIR}/setupDockerCompose-HubAccount.sh
${DIR}/setupDockerCompose-OracleOnboarding.sh
${DIR}/setupDockerCompose-DFSP-A.sh
${DIR}/setupDockerCompose-DFSP-B.sh
${DIR}/setupDockerCompose-PISP.sh
${DIR}/setupDockerCompose-DFSP-SIMULATOR.sh
${DIR}/setupDockerCompose-DFSP-A-MSISDN.sh
${DIR}/setupDockerCompose-DFSP-B-MSISDN.sh
${DIR}/setupDockerCompose-DFSP-SIMULATOR-MSISDN.sh
${DIR}/setupDockerCompose-PISP-MSISDN.sh
${DIR}/setupDockerCompose-dfsp-backend-parties.sh
