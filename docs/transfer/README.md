## Transfer API

### Happy Path

Edit the transfer flow `.puml` files here: [PISP Transfer Api Calls Detailed](./api_calls_detailed.puml)

![PISPTransferSimpleAPI](../out/transfer/api_calls_simple/PISPTransferSimpleAPI.png)
> Puml source: [`./transfer/api_calls_simple.puml`](./transfer/api_calls_simple.puml)

For a more detailed breakdown of the api calls, Refer to the detailed API flows:
 - [Discovery](../out/transfer/api_calls_detailed/PISPTransferDetailedAPI-page1.png)
 - [Agreement](../out/transfer/api_calls_detailed/PISPTransferDetailedAPI-page2.png)
 - [Transfer](../out/transfer/api_calls_detailed/PISPTransferDetailedAPI-page3.png)


### Request TransactionRequest Status

A PISP can issue a `GET /thirdpartyRequests/{id}/transactions` to find the status of a transaction request.

[ todo: in mojaloop/project#1748 ]

### Error Conditions


The PayerDFSP is responsible for communicating failures to the PISP

1. Thirdparty Transaction Request fails

2. Downstream Quote Failure

3. Authorization Failure

4. Transfer Failure


[ todo: in mojaloop/mojaloop#346 ]
