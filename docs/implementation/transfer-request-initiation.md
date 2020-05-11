# Transfer Request Initiation

### draft: proposition how PISP can initiate thirdpartyTransactionTransfer via customized DFSP Simulator
![transfer_initiation_draft](../out/implementation/transfer-request-initiation/Transfer%20Request%20Initiation.png)

## transactionInitations resource

Stores information about transaction initiation status. It represents the channel between PISP backend system and its adapter in mojaloop environment: the PISP_DFSP participant

## PISP
Represents PISP system which handles communication with PISP mobile App operated by Enduser


## PISP_DFSP

Participant which represents third party  able to initiate transaction
It's responsibilities are 
  - to be the adapter between mojaloop system and PISP backend
  - to handle parties resolve phase (discovery)
  - initiate the thirdpartyTransactionRequest
  - forward result of quotation to PISP
  - forward authorization request to PISP and delivers enduser_authorization_proof to SWITCH
  - updates PISP about transaction progress
  
## ThirdpartyTransactionRequest Service 

Handles realization of transfer request initiated by third party (PISP):
  - quotation
  - transfer
  - updates PISP_DFSP about transaction progress