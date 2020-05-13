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


### Outbound (From Participant -> Switch)

#### Existing Calls
- Create Bulk Participant Information - `POST /participants`
- Lookup Participant Information - `GET /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- Create Participant Information - `POST /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- Delete Participant Information - `DELETE /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- Lookup Party Information - `GET /parties/{Type}/{ID}, /parties/{Type}/{ID}/{SubId}`
- Retrieve Transaction Request Information - `GET /transactionRequests/{ID}`
- Perform Transaction Request - `POST /transactionRequests`
- Retrieve Quote Information - `GET /quotes/{ID}`
- Calculate Quote - `POST /quotes`
- Retrieve Bulk Quote Information - `GET /bulkQuotes/{ID}`
- Calculate Bulk Quote - `POST /bulkQuotes`
- Perform Authorization - `GET /authorizations/{ID}`
- Retrieve Transfer Information - `GET /transfers/{ID}`
- Perform Transfer - `POST /transfers`
- Retrieve Bulk Transfer Information - `GET /bulkTransfers/{ID}`
- Perform Bulk Transfer - `POST /bulkTransfers`
- Retrieve Transaction Information - `GET /transactions/{ID}`

#### New Calls for PISP Implementation
- Create Consent Request - `POST /consentRequests/{ID}`
- Update Consent Request - `PUT /consentRequests/{ID}`
- Perform Authorization on this Thing `POST /authorizations/{ID}` __newly added _verb_ for PISP case__
- Create Consent - `PUT /consents/{ID}` _called by a DFSP after a successful `consentRequest`_
- Lookup 3rd party Account Metadata - `GET /thirdPartyRequest/metadata/{Type}/{ID} /thirdPartyRequest/metadata/{Type}/{ID}/{SubId}`
- Initiate 3rd party request - `POST /thirdPartyRequest/transaction`
- Get 3rd party request information - `GET /thirdPartyRequest/transaction/{ID}`


### Inbound (Callbacks from Switch -> Participant)

#### Existing Calls
- Return Bulk Participant Information - `PUT /participants/{ID}`
- Return Bulk Participant Information Error - `PUT /participants/{ID}/error`
- Return Participant Information - `PUT /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- Return Participant Information Error - `PUT /participants/{Type}/{ID}/error, /participants/{Type}/{ID}/{SubId}/error`
- Return Party Information - `PUT /parties/{Type}/{ID}, /parties/{Type}/{ID}/{SubId}`
- Return Party Information Error - `PUT /parties/{Type}/{ID}/error, /parties/{Type}/{ID}/{SubId}/error`
- Return Transaction Request Information - `PUT /transactionRequests/{ID}`
- Return Transaction Request Information Error - `PUT /transactionRequests/{ID}/error`
- Return Quote Information - `PUT /quotes/{ID}`
- Return Quote Information Error - `PUT /quotes/{ID}/error`
- Return Bulk Quote Information - `PUT /bulkQuotes/{ID}`
- Return Bulk Quote Information Error - `PUT /bulkQuotes/{ID}/error`
- Return Authorization Result - `PUT /authorizations/{ID}`
- Return Authorization Error - `PUT /authorizations/{ID}/error`
- Return Transfer Information - `PUT /transfers/{ID}`
- Return Transfer Information Error - `PUT /transfers/{ID}/error`
- Return Bulk Transfer Information - `PUT /bulkTransfers/{ID}`
- Return Bulk Transfer Information Error - `PUT /bulkTransfers/{ID}/error`
- Return Transaction Information - `PUT /transactions/{ID}`
- Return Transaction Information Error - `PUT /transactions/{ID}/error`

#### New Calls for PISP Implementation
- Update Consent Request - `PUT /consentRequests/{ID`
- Update Consent Request Error - `PUT /consentRequests/{ID}/error`
- Create Or Update Consent - `PUT /consents/{ID}` - _inform the PISP of a successful consent creation, or update an existing consent_
- Return 3rd party Account Metadata - `PUT /thirdPartyRequest/metadata/{Type}/{ID} /thirdPartyRequest/metadata/{Type}/{ID}/{SubId}`
- Return 3rd party Account Metadata Error - `PUT /thirdPartyRequest/metadata/{Type}/{ID}/error /thirdPartyRequest/metadata/{Type}/{ID}/{SubId}/error`
- Update 3rd Party Transaction Request - `PUT /thirdPartyRequest/transaction/{ID}`
- Update 3rd Party Transaction Request Error - `PUT /thirdPartyRequest/transaction/{ID}/error`

## Allowed API Calls - Outbound (From Participant -> Switch)

### Existing

| Name | `VERB` | Resource  | DFSP | PISP |
| ---- | ------ | --------  | ---- | ---- | 
| Create Bulk Participant Information       | `PUT`    | `/participants/{ID}`         | ?? | ?? |
| Lookup Participant Information            | `GET`    | `/participants/{Type}/{ID}*` | ?? | ?? |
| Create Participant Information            | `POST`   | `/participants/{Type}/{ID}*` | ?? | ?? |
| Delete Participant Information            | `DELETE` | `/participants/{Type}/{ID}*` | ?? | ?? |
| Lookup Party Information                  | `GET`    | `/parties/{Type}/{ID}*`      | ?? | ?? |
| Retrieve Transaction Request Information  | `GET`    | `/transactionRequests/{ID}`  | ?? | ?? |
| Perform Transaction Request               | `POST`   | `/transactionRequests`       | ?? | ?? |
| Retrieve Quote Information                | `GET`    | `/quotes/{ID}`               | ?? | ?? |
| Calculate Quote                           | `POST`   | `/quotes`                    | ?? | ?? |
| Retrieve Bulk Quote Information           | `GET`    | `/bulkQuotes/{ID}`           | ?? | ?? |
| Calculate Bulk Quote                      | `POST`   | `/bulkQuotes`                | ?? | ?? |
| Perform Authorization                     | `GET`    | `/authorizations/{ID}`       | ?? | ?? |
| Retrieve Transfer Information             | `GET`    | `/transfers/{ID}`            | ?? | ?? |
| Perform Transfer                          | `POST`   | `/transfers`                 | ?? | ?? |
| Retrieve Bulk Transfer Information        | `GET`    | `/bulkTransfers/{ID}`        | ?? | ?? |
| Perform Bulk Transfer                     | `POST`   | `/bulkTransfers`             | ?? | ?? |
| Retrieve Transaction Information          | `GET`    | `/transactions/{ID}`         | ?? | ?? |

### New 
| Name | `VERB` | Resource  | DFSP | PISP |
| ---- | ------ | --------  | ---- | ---- |
| Create Consent Request            | `POST` | `/consentRequests/{ID}`                    | ?? | ?? |
| Update Consent Request            | `PUT`  | `/consentRequests/{ID}`                    | ?? | ?? |
| Perform Authorization             | `POST` | `/authorizations/{ID}`                     | ?? | ?? |
| Create Consent                    | `PUT`  | `/consents/{ID}`                           | ?? | ?? |
| Lookup 3rd party Account Metadata | `GET`  | `/thirdPartyRequest/metadata/{Type}/{ID}*` | ?? | ?? |
| Initiate 3rd party request        | `POST` | `/thirdPartyRequest/transaction`           | ?? | ?? |
| Get 3rd party request information | `GET`  | `/thirdPartyRequest/transaction/{ID}`      | ?? | ?? |

> \* also:  `{Type}/{ID}/{SubId}`

## Allowed API Calls - Inbound (From Switch -> Participant)

### Existing

| Name | `VERB` | Resource  | DFSP | PISP |
| ---- | ------ | --------  | ---- | ---- | 
| Return Bulk Participant Information           | `PUT` |  `/participants/{ID}`               | ?? | ?? |
| Return Bulk Participant Information Error     | `PUT` |  `/participants/{ID}/error`         | ?? | ?? |
| Return Participant Information                | `PUT` |  `/participants/{Type}/{ID}*`       | ?? | ?? |
| Return Participant Information Error          | `PUT` |  `/participants/{Type}/{ID}/error*` | ?? | ?? |
| Return Party Information                      | `PUT` |  `/parties/{Type}/{ID}*`            | ?? | ?? |
| Return Party Information Error                | `PUT` |  `/parties/{Type}/{ID}/error*`      | ?? | ?? |
| Return Transaction Request Information        | `PUT` |  `/transactionRequests/{ID}`        | ?? | ?? |
| Return Transaction Request Information Error  | `PUT` |  `/transactionRequests/{ID}/error`  | ?? | ?? |
| Return Quote Information                      | `PUT` |  `/quotes/{ID}`                     | ?? | ?? |
| Return Quote Information Error                | `PUT` |  `/quotes/{ID}/error`               | ?? | ?? |
| Return Bulk Quote Information                 | `PUT` |  `/bulkQuotes/{ID}`                 | ?? | ?? |
| Return Bulk Quote Information Error           | `PUT` |  `/bulkQuotes/{ID}/error`           | ?? | ?? |
| Return Authorization Result                   | `PUT` |  `/authorizations/{ID}`             | ?? | ?? |
| Return Authorization Error                    | `PUT` |  `/authorizations/{ID}/error`       | ?? | ?? |
| Return Transfer Information                   | `PUT` |  `/transfers/{ID}`                  | ?? | ?? |
| Return Transfer Information Error             | `PUT` |  `/transfers/{ID}/error`            | ?? | ?? |
| Return Bulk Transfer Information              | `PUT` |  `/bulkTransfers/{ID}`              | ?? | ?? |
| Return Bulk Transfer Information Error        | `PUT` |  `/bulkTransfers/{ID}/error`        | ?? | ?? |
| Return Transaction Information                | `PUT` |  `/transactions/{ID}`               | ?? | ?? |
| Return Transaction Information Error          | `PUT` |  `/transactions/{ID}/error`         | ?? | ?? |

### New

| Name | `VERB` | Resource  | DFSP | PISP |
| ---- | ------ | --------  | ---- | ---- |
| Update Consent Request                     | `PUT` | `/consentRequests/{ID`                           | ?? | ?? | 
| Update Consent Request Error               | `PUT` | `/consentRequests/{ID}/error`                    | ?? | ?? | 
| Create Or Update Consent                   | `PUT` | `/consents/{ID}`                                 | ?? | ?? |
| Return 3rd party Account Metadata          | `PUT` | `/thirdPartyRequest/metadata/{Type}/{ID}*`       | ?? | ?? | 
| Return 3rd party Account Metadata Error    | `PUT` | `/thirdPartyRequest/metadata/{Type}/{ID}/error*` | ?? | ?? | 
| Update 3rd Party Transaction Request       | `PUT` | `/thirdPartyRequest/transaction/{ID}`            | ?? | ?? | 
| Update 3rd Party Transaction Request Error | `PUT` | `/thirdPartyRequest/transaction/{ID}/error`      | ?? | ?? | 

> \* also:  `{Type}/{ID}/{SubId}`

<!-- 
## Allowed API Calls + Roles

> This is a first pass. We may want to break down the existing DFSP role later on.
> I'll leave out most of the callbacks for now, since they are somewhat implied by the inbound requests

### 1. DFSP

**Outbound *(From Participant -> Switch)***
- Create Bulk Participant Information - `POST /participants`
- Lookup Participant Information - `GET /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- Create Participant Information - `POST /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- DELETE Participant Information - `DELETE /participants/{Type}/{ID}, /participants/{Type}/{ID}/{SubId}`
- Lookup Party Information - `GET /parties/{Type}/{ID}, /parties/{Type}/{ID}/{SubId}`
- Retrieve Transaction Request Information - `GET /transactionRequests/{ID}`
- Perform Transaction Request - `POST /transactionRequests`
- Retrieve Quote Information - `GET /quotes/{ID}`
- Calculate Quote - `POST /quotes`
- Retrieve Bulk Quote Information - `GET /bulkQuotes/{ID}`
- Calculate Bulk Quote - `POST /bulkQuotes`
- Perform Authorization - `GET /authorizations/{ID}`
- Retrieve Transfer Information - `GET /transfers/{ID}`
- Perform Transfer - `POST /transfers`
- Retrieve Bulk Transfer Information - `GET /bulkTransfers/{ID}`
- Perform Bulk Transfer - `POST /bulkTransfers`
- Retrieve Transaction Information - `GET /transactions/{ID}`
- Update Authorization Request - `PUT /authorizationRequests/{ID}` _[new pisp call]_

**Inbound _(Note: some ommited for brevity)_**
- Receive Authorization Creation Request - `POST /authorizationRequests/{ID}`


### 2. PISP:
**Outbound *(From Participant -> Switch)***
- Lookup Party Information - `GET /parties/{Type}/{ID}, /parties/{Type}/{ID}/{SubId}`
- Lookup 3rd party Account Metadata - `GET /thirdPartyRequest/metadata/{Type}/{ID} /thirdPartyRequest/metadata/{Type}/{ID}/{SubId}`
- Perform Authorization on this Thing `POST /authorizations/{ID}` [newly added for PISP case]
- Update Authorization - `PUT /authorizations/{ID}`
- Create Consent Request - `POST /consentRequests/{ID}`
- Update Consent Request - `PUT /consentRequests/{ID}`
- Create Consent - `PUT /consents/{ID}`
- Return Quote Information - `PUT /quotes/{ID}` _[this probably won't be needed since the quote is going to be a part of the authorizations callback]_
- Return Quote Information Error - `PUT /quotes/{ID}/error` _[same as above]_
- Get 3rd party request information - `GET /thirdPartyRequest/transaction/{ID}`
- Initiate 3rd party request - `POST /thirdPartyRequest/transaction`

**Inbound**
- Return Party Information Error - `PUT /parties/{Type}/{ID}/error, /parties/{Type}/{ID}/{SubId}/error`
- Return Authorization Result - `PUT /authorizations/{ID}`
- Return Authorization Error - `PUT /authorizations/{ID}/error`
- Update Consent Request - `PUT /consentRequests/{ID`
- Update Consent Request Error - `PUT /consentRequests/{ID}/error`
- Update Consent - `POST /consents/{ID}`
- Update 3rd Party Transaction Request - `PUT /thirdPartyRequest/transaction/{ID}`
- Update 3rd Party Transaction Request Error - `PUT /thirdPartyRequest/transaction/{ID}/error` -->

## Questions:

- In the FSPIOP API Definition v1.1, `/authorizations` resource is used solely in conjunction with internal transaction requests. With the addition of a new PISP transaction requests `/thirdPartyRequests/transaction`, we may need to reconsider how `/authorizations` is defined so that it covers both the 'internal' (or existing) transaction request scenario, as well as the new 'Third Party' scenario
  - Michael: "We could distinguish between the authorizations forms for DFSP and PISP by allowing only a DFSP to issue a GET /authorizations, and only a PISP to issue a POST /authorizations"

## Performance Considerations:

We assume Role Based Access Controls will be implemented at an API Gateway.

In order to ensure such an implementation won't greatly affect performance, the goal is to have RBAC that need not inspect the _body_ of the API call (or at least minimize the number of API calls that depend on inspecting the body).

This is possible with the PISP Case by using the a new resource for transaction requests: `thirdparty


