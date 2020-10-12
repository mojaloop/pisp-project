# Docker-Live

A live lab environment for PISP Demos. Deployed using K8s + Helm


## Prerequisites
- `helm` v3 or later
- `kubectl` and access to a running cluster
- `kubens`
- a kubeconfig file (e.g. `~/.kube/config`)
- a kubectl namespace, for this example, we will use `pisp-lab`

## Installing

```bash
cd ./docker-live

# create and switch to namespace
kubectl create namespace pisp-lab
kubens pisp-lab

# install the switch
make install-switch

# install the participants
# Currently dfspa, dfspb, pispa
make install-participants

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
npm run reseed:docker-live

# run a test transaction
make transfer-p2p

```

## Kubecl .yaml files + Helm Charts

For this lab, we use a simplified version of the Mojaloop Helm charts. This includes:
- single instance MySQL
- simplified Kafka with readymade `public/kafka` chart


Additionally, the install is broken into separate pieces:

1. **Prerequisites:** mysql, kafka, with a combination of helm and kafka (see `.install-base` in the [`./Makefile`](./Makefile))
2. **Switch:** The application expressed as helm charts in [`./charts-switch`](./charts-switch)
3. **Participants:** The DFSP and PISP participants. Defined in helm charts at [`./charts-participant`](./charts-participant), and customized using `values.yml` files for either a PISP or DFSP
