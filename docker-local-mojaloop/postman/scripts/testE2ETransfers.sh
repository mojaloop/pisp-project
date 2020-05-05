#!/usr/bin/env bash

newman run --delay-request=2000 --folder='E2E Tests' PISP.postman_collection.json.postman_collection.json
