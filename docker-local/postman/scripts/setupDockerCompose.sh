#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "-== Creating Hub Accounts ==-"
${DIR}/setupDockerCompose-HubAccount.sh

echo "-== Onboarding PayerFSP ==-"
${DIR}/setupDockerCompose-PayerFSP.sh

echo "-== Onboarding PayeeFSP ==-"
${DIR}/setupDockerCompose-PayeeFSP.sh
