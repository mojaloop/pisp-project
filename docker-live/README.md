# Docker-Live

A live lab environment for PISP Demos


## Prerequisites
- `helm` v3 or later
- `kubectl`
- a kubeconfig file and access to a cluster 


## Installing


```bash
make install
# wait for pods to be up and running

# check the health
make health-check

# seed the database
make seed

# run a test transaction
make script:transaction


```