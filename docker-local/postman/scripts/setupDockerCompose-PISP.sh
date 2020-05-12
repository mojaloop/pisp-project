#!/usr/bin/env bash

newman run --delay-request=2000 --folder='pisp (data setup)' --environment=environments/Mojaloop-Local-Docker-Compose.postman_environment_PISP.json OSS-New-Deployment-FSP-Setup.postman_collection_DFSPs.json
