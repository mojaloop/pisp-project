# Design Decisions

> For now, let's place the decisions inline for ease of reference, but we may want each decision to have it's own `.md` file in the future.

## Outstanding Questions

- Q: How does the switch _know_ to send a callback to the PISP after a sucessful transfer?
  - when DFSPA issues `POST /transfer`, that's between DFSPA  + DFSPB
  - It should have a `transferId` that is related to the `thirdPartyRequest`
    - how does the PISP or Switch know which transaction this `transferId` is related?
    - tx id will be set in the `POST /authorizations` (when the authorization is created by the DFSP)
    - how do we get from a `transactionId` to a `transferId`?
      - ILP packet is in transfer request, but encoded... so need to figure this piece out
    - For now, assume that the `Transaction` object will contain the `transferId`
  > Note: this is being tracked in [#270](https://app.zenhub.com/workspaces/pisp-5e8457b05580fb04a7fd4878/issues/mojaloop/mojaloop/270)

- Q. How does the switch determine whether or not a DFSP is using their own FIDO service? Do we want to use the ALS or some other method?

- Q. Which api should the DFSP need to implement for PISP functionaliy? We have a few options:
    1. Add the DFSP changes to the existing FSPIOP-API
    2. Add the DFSP changes to the new `thirdparty-api`
    3. Divide the `thirdparty-api` into 2 parts: 
        - `thirdparty-pisp-api` for the PISP to implement
        - `thirdparty-dfsp-api` for the DFSP to implement


## Decisions Made

###  How should we implement the changes required for the PISP role? 
 - Should we extend the existing APIs or should we create one or more new APIs to manage the specialised PISP interactions?

We are going to add a new api, called the `thirdparty-api` to cover at least the PISP's interactions with the switch.

There is still the outstanding question for the DFSP side of the equation (See above)


### Should the `mojaloop/auth-service` API be Sync or Async?

It will be Async


### What is the challenge that is being signed during the transfer flow?

The condition from the `QuoteResponse` object should be signed by the PISP app running on the user's device.

### PISP transfer initiation resource

For the PISP role, we will add an additional resource to the API to initiate a 3rd party payment
- currently we are planning on calling it `/thirdPartyRequests/transfer`. This may change.
- For our current implementation work however, we can still use the existing `/transactionRequests` resource.


### Handling of an `/authorization` for external FIDO

In the case where a DFSP wishes to bring their own FIDO Service instead of using the FIDO service that is a part of the hub (`mojaloop/auth-service`), we want to pass on the `PUT /authorization/{id}` (see `AG-26` in the Transfers E2E flow) directly to the DFSP for their own FIDO Service to verify that the public key matches the signed challenge.

This means that we don't need to unpack the `authorization` object, nor do we need to design a new API Endpoint for external auth services.

This does, however, require some thinking about the error cases when verifying the signed challenge. Here is what we have proposed:
- internal (Mojaloop-hosted) fido: failure case for FIDO -> forward error to DFSP in `PUT /authorizations/{id}/error`
- external fido: forward whole `PUT /authorizations/{id}` request to the DFSP to take care
