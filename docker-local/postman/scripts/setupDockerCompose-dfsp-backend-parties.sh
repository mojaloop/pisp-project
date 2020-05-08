#!/usr/bin/env bash

newman run --delay-request=2000 --folder='Add parties to DFSP backends' PISP.postman_collection.json.postman_collection.json
