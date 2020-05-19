# pisp/docs

Supporting documentation for the PISP implementation.

## Overview
- [Sequence Diagrams](#sequence-diagrams)
  - [Linking Steps](#linking)
      - [Linking List of Endpoints](#linking---endpoints)
  - [Transfer Steps](#transfer)
    - [Transfer List of Endpoints](#transfer---endpoints)
- [Design Decisions](./design-decisions/README.md)
- [Proposed Error Codes](./error_codes.md)
- [Git Branching Strategy](./git_branching.md)
- [Mojaloop Roles + Endpoints](./roles_and_endpoints.md)
- [Tools](#tools)

## Sequence Diagrams

### Linking

> Note: This section is currently under revision as of 19/05/2020. Expect changes.

#### 1. Discovery
![discovery](./out/linking/1-discovery/PISP%20Linking%20%20Discovery.png)

#### 2a. Authentication - Web
![authentication web](./out/linking/2a-authentication-web/PISP%20Linking%20%20Authentication.png)

#### 3a. Delegation & Consent - Web Option
![delegation](./out/linking/3a-delegation-web/PISP%20Linking%20%20Delegation%20+%20Consent.png)

#### 4a. FIDO Registration - Web Option
![Account Selection](./out/linking/4a-fido-registration-web/PISP%20Linking%20%20Fido%20Enrolment.png)

#### 2b. Authentication - SMS Option
![authentication sms](./out/linking/2b-authentication-sms/PISP%20Linking%20%20Authentication.png)

#### 3b. Delegation & Consent - SMS Option
![delegation](./out/linking/3b-delegation-sms/PISP%20Linking%20%20Delegation%20+%20Consent.png)

#### 4b. FIDO Registration - SMS Option
![Account Selection](./out/linking/4b-fido-registration-sms/PISP%20Linking%20%20Fido%20Enrolment.png)


#### Linking - Endpoints 

> Note: The linking endpoint list is still a work in progress, and is blocked by [#280](https://app.zenhub.com/workspaces/pisp-5e8457b05580fb04a7fd4878/issues/mojaloop/mojaloop/280)

`DISC-C GET /participants/role/pisp`

** does the callback url need to be validated by the switch?
** in delegaction, can the consent/consentRequest time out? 
** what happens if the user doesn't give consent?


### Transfer

For the full transfer flows, see the [E2E PISP Transfer Flows](./out/transfer/complete/PISP%20transfer.png).

Edit the transfer flow `.puml` files here: [PISP Transfer Flow UML](./transfer)

[`./transfer/complete.puml`](./transfer/complete.puml) Combines the following diagrams into one.


#### 1. Discovery
>_[PUML source: `./transfer/1-discovery.puml`](./transfer/1-discovery.puml)_
![discovery](./out/transfer/1-discovery/PISP%20Transfer.png)

#### 2. Agreement
>_[PUML source: `./transfer/2-agreement.puml`](./transfer/2-agreement.puml)_

![agreement](./out/transfer/2-agreement/PISP%20Transfer.png)

#### 3. Transfer
>_[PUML source: `./transfer/3-transfer.puml`](./transfer/3-transfer.puml)_
![tranfer](./out/transfer/3-transfer/PISP%20Transfer.png)


#### Transfer - Endpoints 
> Note: this could maybe move to a better place, but it's here for now.

| ID      | VERB              | URI                                       | `Source` | `Destination`  |
| ------- | ----------------- | ----------------------------------------- | ---- | --- |
| `LK-4`  | `GET`             | `/parties`                                | PISP   | SWITCH |
| `LK-6`  | `GET`             | `/parties/{Type}/{ID}`                    | SWITCH | ALS    |
| `LK-8`  | `GET`             | `/parties/{Type}/{ID}`                    | SWITCH | DFSPB  |
| `LK-11` | `PUT`             | `/parties/{Type}/{ID}`                    | DFSPB  | SWITCH |
| `LK-13` | `PUT`             | `/parties/{Type}/{ID}`                    | SWITCH | PISP   |
| `LK-19` | `POST`            | `/thirdPartyRequests/transfer`*0          | PISP   | SWITCH |
| `LK-22` | `POST`            | `/thirdPartyRequests/transfer`*1          | SWITCH | DFSPA  |
| `AG-1`  | `POST`            | `/quotes`                                 | DFSPA  | SWITCH |
| `AG-3`  | `POST`            | `/quotes`                                 | SWITCH | DFSPB  |
| `AG-6`  | `PUT`             | `/quotes/{ID}`                            | DFSPB | SWITCH  |
| `AG-8`  | `PUT`             | `/quotes/{ID}`                            | SWITCH | DFSPA  |
| `AG-15` | `POST`            | `/authorizations`                         | DFSPA  | SWITCH |
| `AG-17` | `POST`            | `/authorizations`*2                       | SWITCH | PISP   |
| `AG-26` | `PUT`             | `/authorizations/{ID}`                    | PISP   | SWITCH |
| `AG-28` | `GET`             | `/endpoints/FIDO/{ID}`                    | SWITCH | ALS?   |
| `AG-30` | `POST`            | `/performVerification`*3                  | SWITCH | FIDO   |
| `AG-32` | `PUT`             | `/verificationResult/{ID}`*4              | FIDO   | SWITCH |
| `AG-34` | `PUT`             | `/authorizations/{ID}`                    | SWITCH | DFSPA  |
| `TR-3`  | `PUT`             | `/thirdPartyRequest/transfer/{ID}`*5      | SWITCH | PISP   |


> 0. As discussed, for now we will implement this as the existing `/transactionRequest`
> 1. This is a new endpoint the DFSP needs to be able to handle
> 2. A new VERB for authorizations for the PISP use case 
> 3. Do we want the FIDO server to be synchronous? I think not because it could be externally hosted in the future, but open for debate.
> 4. These resource names are up for debate
> 5. We use this endpoint to inform the PISP of the tranfer status.


## Tools

To update the sequence diagrams in `./docs/out`, ensure you have the [PlantUML vscode plugin](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml&ssr=false#overview) installed.

1. `CMD + Shift + P`
2. Select `PlantUML: Export Workspace Diagrams`
3. Wait for the export to complete, and commit the changes
