# Design Decisions

> For now, let's place the decisions inline for ease of reference, but we may want each decision to have it's own `.md` file in the future.

## Outstanding Questions

- Q: How does the switch _know_ to send a callback to the PISP after a sucessful transfer?
    - Refer to [#42](https://github.com/mojaloop/pisp/issues/42)

- Q: Will we make a new `thirdparty-scheme-adapter` to handle thirdparty requests?
    - Signs point to yes at the moment, but the challenge is how to divide between the existing `sdk-scheme-adapter` and a new `thirdparty-scheme-adapter`

## Decisions Made

### How does the switch determine whether or not a DFSP is using their own FIDO service? Do we want to use the ALS or some other method?

We will use the ALS to record the auth service for a given participant

For example, to find the Auth service for `dfspa`, a participant can call `GET /participants/AUTHSERVICE/dfspa`

#### Example 1. internal auth-service

**request**
```
GET /participants/AUTHSERVICE/dfspa
```
**response**
```
{
  "fspId": "switch"
}
```

#### Example 2. dfsp's own auth service
**request**
```
GET /participants/AUTHSERVICE/dfspb
```
**response**
```
{
  "fspId": "dfspb"
}
```




### Will the `pisp-demo-server` use the `sdk-scheme-adapter`/`thirdparty-scheme-adapter`? Or will it speak native async mojaloop?
It will speak native async mojaloop, so will not be using any adapter. It will however use the `sdk-standard-components` which is currently being updated for 

For now, we are adding PISP functionality to the sdk-scheme-adapter primarily because the mojaloop-simulator requires it for our end to end tests.


### Which api should the DFSP need to implement for PISP functionaliy? We have a few options:
  1. Add the DFSP changes to the existing FSPIOP-API
  2. Add the DFSP changes to the new `thirdparty-api`
  3. Divide the `thirdparty-api` into 2 parts: 
      - `thirdparty-pisp-api` for the PISP to implement
      - `thirdparty-dfsp-api` for the DFSP to implement

A: Option 3: We are going to 

Refer to [DA issue #]() for more information


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
