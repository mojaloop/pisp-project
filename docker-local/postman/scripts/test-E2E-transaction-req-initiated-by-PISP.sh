#!/usr/bin/env bash

newman run --delay-request=2000 --folder='PISP-Initiate-TRX-Reqs-Tests' PISP.postman_collection.json.postman_collection.json
