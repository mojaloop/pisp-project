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

### FSPIOP-API (DFSP -> Switch)

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
| Update Authorization                      | `PUT`    | `/authorizations/{ID}`       | ✅ | ✅ |   |
| Retrieve Transfer Information             | `GET`    | `/transfers/{ID}`            | ✅ | ❌ |   |
| Perform Transfer                          | `POST`   | `/transfers`                 | ✅ | ❌ |   |
| Retrieve Bulk Transfer Information        | `GET`    | `/bulkTransfers/{ID}`        | ✅ | ❌ |   |
| Perform Bulk Transfer                     | `POST`   | `/bulkTransfers`             | ✅ | ❌ |   |
| Retrieve Transaction Information          | `GET`    | `/transactions/{ID}`         | ✅ | ❌ |   |

> \* also:  `{Type}/{ID}/{SubId}`


### ThirdParty-PISP-API (PISP -> Switch)

Api for a PISP to implement to allow PISP functionality.

| Name | isNew? | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | ------ | --------  | ---- | ---- | ---- |
| Lookup Party Information          | N | `GET`  | `/parties/{Type}/{ID}*`                    | ✅ | ✅ |  |
| Update Authorization              | N | `PUT`  | `/authorizations/{ID}`                     | ✅ | ✅ | PISP calls this with signed challenge during a transaction  |
| Create Consent Request            | Y | `POST` | `/consentRequests`                         | ❌ | ✅ |  | 
| Update Consent Request            | Y | `PUT`  | `/consentRequests/{ID}`                    | ✅ | ✅ | Based on our current designs, both a DFSP and PISP use this to callback to one another about the `consentRequest` | 
| Request Challenge                 | Y | `PUT`  | `/consents/{ID}/createCredential`          | ❌ | ✅ | PISP needs to request a challenge for the given consent | 
| Lookup Consent                    | Y | `GET`  | `/consents/{ID}`                           | ✅ | ✅ |  | 
| Update Consent                    | Y | `PUT`  | `/consents/{ID}`                           | ✅ | ✅ | To update add a credential or verify a credential, setting the status to `VERIFIED` | 
| Initiate 3rd party request        | Y | `POST` | `/thirdpartyRequests/transactions`           | ❌ | ✅ |  | 
| Get 3rd party request information | Y | `GET`  | `/thirdpartyRequests/transactions/{ID}`      | ❌ | ✅ |  | 

> \* also:  `{Type}/{ID}/{SubId}`


### ThirdParty-DFSP-API (DFSP -> Switch)

Api for a DFSP to implement to allow PISP functionality.

| Name | isNew? | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | ------ | --------  | ---- | ---- | ---- |
| Perform 3rd Party Authorization  | Y | `POST` | `/authorizations`                                    | ✅ | ❌ | DFSP needs to call this with FIDO Result     | 
| Update Consent Request           | Y | `PUT`  | `/consentRequests/{ID}`                              | ✅ | ✅ | Based on our current designs, both a DFSP and PISP use this to callback to one another about the `consentRequest` | 
| Create Consent                   | Y | `POST` | `/consents`                                          | ✅ | ❌ | Called by DFSP after a successful `consentRequest` flow | 
| Lookup Consent                   | Y | `GET`  | `/consents/{ID}`                                     | ✅ | ✅ |  | 
| Update Consent                   | Y | `PUT`  | `/consents/{ID}`*                                    | ✅ | ✅ | To update add a credential or verify a credential, setting the status to `VERIFIED` |
| Verify a 3rd party transaction   | Y | `POST` | `/thirdpartyRequests/transactions/{ID/authorizations` | ❌ | ✅ | Called by a DFSP to check the authorization it gets back from a PISP | 


> \* `PUT /consents/{ID}` from the DFSP may not be required. 


## API Calls - Inbound (From Switch -> Participant)

### FSPIOP-API (Switch -> DFSP)

| Name | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | --------  | ---- | ---- | ---- |
| Return Bulk Participant Information           | `PUT` |  `/participants/{ID}`               | ✅ | ❌ |  |
| Return Bulk Participant Information Error     | `PUT` |  `/participants/{ID}/error`         | ✅ | ❌ |  |
| Return Participant Information                | `PUT` |  `/participants/{Type}/{ID}*`       | ✅ | ❌ |  |
| Return Participant Information Error          | `PUT` |  `/participants/{Type}/{ID}/error*` | ✅ | ❌ |  |
| Return Party Information                      | `PUT` |  `/parties/{Type}/{ID}*`            | ✅ | ✅ | PISP needs to get result of party lookup |
| Return Party Information Error                | `PUT` |  `/parties/{Type}/{ID}/error*`      | ✅ | ✅ | PISP needs to get result of party lookup |
| Lookup Party Information                      | `GET` | `/parties/{Type}/{ID}*`             | ✅ | ✅ |   |
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

### ThirdParty-PISP-API (Switch -> PISP)

| Name | isNew? | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | ------ | --------  | ---- | ---- | ---- |
| Return Party Information                      | N | `PUT`  | `/parties/{Type}/{ID}*`                          | ✅ | ✅ | PISP needs to get result of party lookup |
| Return Party Information Error                | N | `PUT`  | `/parties/{Type}/{ID}/error*`                    | ✅ | ✅ | PISP needs to get result of party lookup |
| Return Authorization Result                   | N | `PUT`  | `/authorizations/{ID}`                           | ✅ | ✅ | *May not be required* |
| Return Authorization Error                    | N | `PUT`  | `/authorizations/{ID}/error`                     | ✅ | ✅ | Inform PISP of authorization error |
| Update Consent Request                        | Y | `PUT`  | `/consentRequests/{ID}`                          | ✅ | ✅ |  | 
| Update Consent Request Error                  | Y | `PUT`  | `/consentRequests/{ID}/error`                    | ✅ | ✅ |  | 
| Create Consent                                | Y | `POST` | `/consents/`*2                                   | ❌ | ✅ | Callback a PISP gets once `consentRequest` is successful |
| Create Or Update Consent                      | Y | `PUT`  | `/consents/{ID}`*2                               | ❌ | ✅ | Callback a PISP gets once consent's challenge has been added |
| Perform Authorization                         | Y | `POST` | `/authorizations/`                               | ❌ | ✅ | Requests Authorization for a `thirdpartyRequests/transaction` from DFSP | 
| Update 3rd Party Transaction Request          | Y | `PUT`  | `/thirdpartyRequests/transactions/{ID}`           | ❌ | ✅ | Called at the end of the transaction flow, to inform PISP of final result | 
| Update 3rd Party Transaction Request Error    | Y | `PUT`  | `/thirdpartyRequests/transactions/{ID}/error`     | ❌ | ✅ | Inform PISP of an error during the `thirdpartyRequests/transaction` | 

> \* also: `{Type}/{ID}/{SubId}`
> \*2 We may want this to be _only_ be a POST to create a consent, to keep things consistent


### ThirdParty-DFSP-API (Switch -> DFSP)

DFSP inbound API calls required for PISP functionality.

| Name | isNew? | `VERB` | Resource  | DFSP | PISP | Note |
| ---- | ------ | ------ | --------  | ---- | ---- | ---- |
| Lookup Party Information              | N | `GET`  | `/parties/{Type}/{ID}*`                                   | ✅ | ✅ |   |
| Return Quote Information              | N | `PUT`  | `/quotes/{ID}`                                            | ✅ | ❌ |  |
| Perform Transfer                      | N | `POST` | `/transfers`                                              | ✅ | ❌ |   |
| Update Authorization                  | N | `PUT`  | `/authorizations/{ID}`                                    | ✅ | ❌ | PISP calls this with signed challenge during a transaction  |
| Create Consent Request                | Y | `POST` | `/consentRequests`                                        | ✅ | ✅ |  | 
| Update Consent Request                | Y | `PUT`  | `/consentRequests/{ID}`                                   | ✅ | ✅ | Based on our current designs, both a DFSP and PISP use this to callback to one another about the `consentRequest` | 
| Lookup Consent                        | Y | `GET`  | `/consents/{ID}`                                          | ✅ | ✅ |  | 
| Update Consent                        | Y | `PUT`  | `/consents/{ID}`*2                                        | ✅ | ✅ | Only in the case of 3rd party FIDO service, DFSP can opt to verify the signature themselves | 
| Initiate 3rd party request            | Y | `POST` | `/thirdpartyRequests/transactions`                          | ✅ | ❌ | Handle the 3rd party request, and ask Payee FSP for quote | 
| Update a 3rd party verification       | Y | `PUT`  | `/thirdpartyRequests/transactions/{ID/authorizations`      | ✅ | ❌ | Called by the auth service on successful validation of authorization | 
| Update a 3rd party verification error | Y | `PUT`  | `/thirdpartyRequests/transactions/{ID/authorizations/error`| ✅ | ❌ | Called by the auth service on unsuccesful validation of authorization | 


> \* also: `{Type}/{ID}/{SubId}`
> \*2 `PUT /consents/{ID}` from the DFSP may not be required. 


## Security Considerations:

We assume an API Gateway will be able to distinguish between the participant's role (DFSP or PISP), and whether or not they have the access to call the given API.


