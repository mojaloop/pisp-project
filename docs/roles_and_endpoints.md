# Mojaloop/PISP Roles

A summary of Mojaloop FSPIOP API Endpoints and Roles as they stand today.

## Roles

- DFSP
  - fund-holding participant
  - has clearing and settlement functions
  - allows PISPs to initiate transfers on behalf of their users

- PISP
  - non-fund holding participant (and therefore no clearing or settlements as well)
  - initiates transfers on user's behalf
  - assumes delegated permissions _from_ user

## API Calls:

- Existing calls are taken from [Mojaloop API Spec](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#611-supported-api-services)
- New calls are detailed either in the [updated pisp flows](./README.md), or [#59-mojaloop-specification](https://github.com/mojaloop/mojaloop-specification/issues/59)

## API Calls - Outbound (From Participant -> Switch)

### Existing

| Name | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | --------  | ---- | ---- | ---- |
| Create Bulk Participant Information       | `PUT`    | `/participants/{ID}`         | ✅ | ❌ |   |
| Lookup Participant Information            | `GET`    | `/participants/{Type}/{ID}*` | ✅ | ❌ |   |
| Create Participant Information            | `POST`   | `/participants/{Type}/{ID}*` | ✅ | ❌ |   |
| Delete Participant Information            | `DELETE` | `/participants/{Type}/{ID}*` | ✅ | ❌ |   |
| Lookup Party Information                  | `GET`    | `/parties/{Type}/{ID}*`      | ✅ | ✅ |   |
| Retrieve Transaction Request Information  | `GET`    | `/transactionRequests/{ID}`  | ✅ | ❌ |   |
| Perform Transaction Request               | `POST`   | `/transactionRequests`       | ✅ | ❌ |   |
| Retrieve Quote Information                | `GET`    | `/quotes/{ID}`               | ✅ | ❌ |   |
| Calculate Quote                           | `POST`   | `/quotes`                    | ✅ | ❌ |   |
| Retrieve Bulk Quote Information           | `GET`    | `/bulkQuotes/{ID}`           | ✅ | ❌ |   |
| Calculate Bulk Quote                      | `POST`   | `/bulkQuotes`                | ✅ | ❌ |   |
| Perform Authorization                     | `GET`    | `/authorizations/{ID}`       | ✅ | ❌ |   |
| Update Authorization                      | `PUT`    | `/authorizations/{ID}`       | ✅ | ❌ |   |
| Retrieve Transfer Information             | `GET`    | `/transfers/{ID}`            | ✅ | ❌ |   |
| Perform Transfer                          | `POST`   | `/transfers`                 | ✅ | ❌ |   |
| Retrieve Bulk Transfer Information        | `GET`    | `/bulkTransfers/{ID}`        | ✅ | ❌ |   |
| Perform Bulk Transfer                     | `POST`   | `/bulkTransfers`             | ✅ | ❌ |   |
| Retrieve Transaction Information          | `GET`    | `/transactions/{ID}`         | ✅ | ❌ |   |

### New 
| Name | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | --------  | ---- | ---- | ---- |
| Create Consent Request            | `POST` | `/consentRequests`                         | ❌ | ✅ |  | 
| Update Consent Request            | `PUT`  | `/consentRequests/{ID}`                    | ✅ | ✅ | Based on our current designs, both a DFSP and PISP use this to callback to one another about the `consentRequest` | 
| Perform 3rd Party Authorization   | `POST` | `/authorizations`                          | ❌ | ✅ | PISP needs to call this with FIDO Result     | 
| Create Consent                    | `PUT`  | `/consents/{ID}`                           | ✅ | ❌ | Called after a successful `consentRequest` flow | 
| Lookup 3rd party Account Metadata | `GET`  | `/thirdPartyRequest/metadata/{Type}/{ID}*` | ❌ | ✅ | I've called this metadata but it could be something else, such as `balances` | 
| Initiate 3rd party request        | `POST` | `/thirdPartyRequest/transaction`           | ❌ | ✅ |  | 
| Get 3rd party request information | `GET`  | `/thirdPartyRequest/transaction/{ID}`      | ❌ | ✅ |  | 

> \* also:  `{Type}/{ID}/{SubId}`

## API Calls - Inbound (From Switch -> Participant)

> Note: since these are callbacks from the switch to a participant, the access controls will be different from the Outbound.
> I suppose this list can also act as a list of _what requests a PISP needs to listen for_.

### Existing

| Name | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | --------  | ---- | ---- | ---- |
| Return Bulk Participant Information           | `PUT` |  `/participants/{ID}`               | ✅ | ❌ |  |
| Return Bulk Participant Information Error     | `PUT` |  `/participants/{ID}/error`         | ✅ | ❌ |  |
| Return Participant Information                | `PUT` |  `/participants/{Type}/{ID}*`       | ✅ | ❌ |  |
| Return Participant Information Error          | `PUT` |  `/participants/{Type}/{ID}/error*` | ✅ | ❌ |  |
| Return Party Information                      | `PUT` |  `/parties/{Type}/{ID}*`            | ✅ | ✅ | PISP needs to get result of party lookup |
| Return Party Information Error                | `PUT` |  `/parties/{Type}/{ID}/error*`      | ✅ | ✅ | PISP needs to get result of party lookup |
| Return Transaction Request Information        | `PUT` |  `/transactionRequests/{ID}`        | ✅ | ❌ |  |
| Return Transaction Request Information Error  | `PUT` |  `/transactionRequests/{ID}/error`  | ✅ | ❌ |  |
| Return Quote Information                      | `PUT` |  `/quotes/{ID}`                     | ✅ | ❌ |  |
| Return Quote Information Error                | `PUT` |  `/quotes/{ID}/error`               | ✅ | ❌ |  |
| Return Bulk Quote Information                 | `PUT` |  `/bulkQuotes/{ID}`                 | ✅ | ❌ |  |
| Return Bulk Quote Information Error           | `PUT` |  `/bulkQuotes/{ID}/error`           | ✅ | ❌ |  |
| Return Authorization Result                   | `PUT` |  `/authorizations/{ID}`             | ✅ | ✅ |  |
| Return Authorization Error                    | `PUT` |  `/authorizations/{ID}/error`       | ✅ | ✅ |  |
| Return Transfer Information                   | `PUT` |  `/transfers/{ID}`                  | ✅ | ❌ |  |
| Return Transfer Information Error             | `PUT` |  `/transfers/{ID}/error`            | ✅ | ❌ |  |
| Return Bulk Transfer Information              | `PUT` |  `/bulkTransfers/{ID}`              | ✅ | ❌ |  |
| Return Bulk Transfer Information Error        | `PUT` |  `/bulkTransfers/{ID}/error`        | ✅ | ❌ |  |
| Return Transaction Information                | `PUT` |  `/transactions/{ID}`               | ✅ | ❌ |  |
| Return Transaction Information Error          | `PUT` |  `/transactions/{ID}/error`         | ✅ | ❌ |  |

### New

| Name | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | --------  | ---- | ---- | ---- |
| Update Consent Request                     | `PUT`  | `/consentRequests/{ID`                           | ✅ | ✅ |  | 
| Update Consent Request Error               | `PUT`  | `/consentRequests/{ID}/error`                    | ✅ | ✅ |  | 
| Create Or Update Consent                   | `PUT`  | `/consents/{ID}`                                 | ❌ | ✅ | Callback a PISP gets once `consentRequest` is successful |
| Return 3rd party Account Metadata          | `PUT`  | `/thirdPartyRequest/metadata/{Type}/{ID}*`       | ❌ | ✅ | I've called this metadata but it could be something else, such as `balances` | 
| Return 3rd party Account Metadata Error    | `PUT`  | `/thirdPartyRequest/metadata/{Type}/{ID}/error*` | ❌ | ✅ | I've called this metadata but it could be something else, such as `balances` | 
| Perform Authorization                      | `POST` | `/authorizations/`                               | ❌ | ✅ | Switch requests Authorization for `thirdPartyRequest` from PISP | 
| Update 3rd Party Transaction Request       | `PUT`  | `/thirdPartyRequest/transaction/{ID}`            | ❌ | ✅ |  | 
| Update 3rd Party Transaction Request Error | `PUT`  | `/thirdPartyRequest/transaction/{ID}/error`      | ❌ | ✅ |  | 

> \* also:  `{Type}/{ID}/{SubId}`

## Questions:

- In the FSPIOP API Definition v1.1, `/authorizations` resource is used solely in conjunction with internal transaction requests. With the addition of a new PISP transaction requests `/thirdPartyRequests/transaction`, we may need to reconsider how `/authorizations` is defined so that it covers both the 'internal' (or existing) transaction request scenario, as well as the new 'Third Party' scenario
  - Michael: "We could distinguish between the authorizations forms for DFSP and PISP by allowing only a DFSP to issue a GET /authorizations, and only a PISP to issue a POST /authorizations"

## Performance Considerations:

We assume Role Based Access Controls will be implemented at an API Gateway.

In order to ensure such an implementation won't greatly affect performance, the goal is to have RBAC that need not inspect the _body_ of the API call (or at least minimize the number of API calls that depend on inspecting the body).

This is possible with the PISP Case by using the a new resource for transaction requests: `thirdparty


