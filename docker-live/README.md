# Docker-Live

A live lab environment for PISP Demos


## Prerequisites
- `helm` v3 or later
- `kubectl`
- `kubens`
- a kubeconfig file (e.g. `~/.kube/config`)
- a running kubernetes cluster `>1.16.0`
- a kubectl namespace, for this example, we will use `pisp-lab`


## Installing

```bash
cd ./docker-live

# create and switch to namespace
kubectl create namespace pisp-lab
kubens pisp-lab

# install the prerequisites, then install the application
make install

# wait for pods to be up and running
kubectl get po

# find the IP address of the load balancer and set ELB_URL variable
make get-elb

# Will print something like the following
# ****.elb.amazonaws.com

# Export
export ELB_URL=****.elb.amazonaws.com

# check the health of the services
make health-check

# seed the database
make seed

# run a test transaction
make script:transaction

```

## Kubecl .yaml files + Helm Charts

For this lab, we use a simplified version of the Mojaloop Helm charts. 

- single instance MySQL
- simplified Kafka with readymade `public/kafka` chart
- 


Additionally, the install happens in stages:

1. Prerequisites: mysql, kafka, with a combination of helm and kafka (see `.install-base` in the [`./Makefile`](./Makefile))
2. Application: The application expressed as helm charts in [`./charts`](./charts)



## Todo:

- [ ] clean up makefile and docs
- [ ] set up proper dns or something
- [ ] port across docker-compose stuff
- [ ] 