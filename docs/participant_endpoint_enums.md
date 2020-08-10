# Participant Endpoint Enums

This is the list of endpoints that a PISP or DFSP must register with the switch to get callbacks from the `thirdparty-api-adapter` and `transaction-request-service`.

These endpoints should be added to the enums of `central-services-shared`, and the seeds of `central-ledger`

## PISP:

- `THIRDPARTY_CALLBACK_URL_CONSENT_REQUEST_PUT`
- `THIRDPARTY_CALLBACK_URL_CONSENT_REQUEST_PUT_ERROR`
- `THIRDPARTY_CALLBACK_URL_CONSENT_POST`
- `THIRDPARTY_CALLBACK_URL_CONSENT_PUT`
- `THIRDPARTY_CALLBACK_URL_CONSENT_PUT_ERROR`
- `THIRDPARTY_CALLBACK_URL_TRANSACTION_REQUEST_PUT`
- `THIRDPARTY_CALLBACK_URL_TRANSACTION_REQUEST_PUT_ERROR`
- `FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE` 
    > (Note this is the existing endpoint for `/authorizations` resource)

## DFSP:

- `THIRDPARTY_CALLBACK_URL_TRANSACTION_REQUEST_POST`
- `THIRDPARTY_CALLBACK_URL_CONSENT_REQUEST_PUT`
- `THIRDPARTY_CALLBACK_URL_CONSENT_REQUEST_PUT_ERROR`
- `THIRDPARTY_CALLBACK_URL_CONSENT_POST`
    > Point to central-auth to get the final consent creation - see [GRANT-4](https://github.com/mojaloop/pisp/tree/master/docs/linking#15-grant-consent)
- `THIRDPARTY_CALLBACK_URL_CREATE_CREDENTIAL_POST`
    > Point to central-auth for central, or dfsp for self-hosted auth service
- `THIRDPARTY_CALLBACK_URL_CONSENT_PUT`
    > This is tricky, as for some requests it should be central-auth, but others it should be the dfsp itself...

- `THIRDPARTY_CALLBACK_URL_CONSENT_PUT_ERROR`
- `FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE` 
    > (Note this is the existing endpoint for `/authorizations` resource)
- `THIRDPARTY_CALLBACK_URL_TRANSACTION_REQUEST_AUTHORIZATIONS_POST`
    > Point to central-auth for central, or dfsp for self-hosted auth service
- `THIRDPARTY_CALLBACK_URL_TRANSACTION_REQUEST_AUTHORIZATIONS_PUT`
    > Point to dfsp
- `THIRDPARTY_CALLBACK_URL_TRANSACTION_REQUEST_AUTHORIZATIONS_PUT_ERROR`
    > Point to dfsp
