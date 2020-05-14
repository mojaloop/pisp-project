# pisp/docs

Supporting documentation for the PISP implementation.

## Sequence Diagrams

### Linking

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


### Transfer

For the entire flows, see the [PISP Transfer model](./out/transfer/complete/PISP%20transfer.png)

### 1. Discovery
![discovery](./out/transfer/1-discovery/PISP%20Transfer.png)

### 2. Agreement

![agreement](./out/transfer/2-agreement/PISP%20Transfer.png)

### 3. Transfer

![transfer](./out/transfer/3-transfer/PISP%20Transfer.png)

> Note: I don't think `TR-1` and `TR-2` are valid any longer as we will be relying on the switch to initiate the `/thirdPartyRequest/transfer/{ID}` callback to the PISP to inform the PISP on the outcome of a transfer.


#### Transfer - Endpoints 
> Note: this could maybe move to a better place, but it's here for now.

| ID      | VERB              | URI                                 | `Source` | `Destination`  |
| ------- | ----------------- | ----------------------------------- | ---- | --- |
| `LK-4`  | `GET`             | `/parties`                          | PISP   | SWITCH |
| `LK-6`  | `GET`             | `/participants/{Type}/{ID}`         | SWITCH | ALS    |
| `LK-8`  | `GET`             | `/parties/{Type}/{ID}`              | SWITCH | DFSPB  |
| `LK-11` | `PUT`             | `/parties/{Type}/{ID}`              | DFSPB  | SWITCH |
| `LK-13` | `PUT`             | `/parties/{Type}/{ID}`              | SWITCH | PISP   |
| `LK-19` | `POST`            | `/thirdPartyRequest/transfer`*0     | PISP   | SWITCH |
| `LK-22` | `POST`            | `/transactionRequests`*1            | PISP   | SWITCH |
| `AG-1`  | `POST`            | `/quotes`                           | DFSPA  | SWITCH |
| `AG-3`  | `POST`            | `/quotes`                           | SWITCH | DFSPB  |
| `AG-6`  | `PUT`             | `/quotes/{ID}`                      | SWITCH | DFSPB  |
| `AG-8`  | `PUT`             | `/quotes/{ID}`                      | SWITCH | DFSPA  |
| `AG-15` | `GET`             | `/authorizations/{ID}`              | DFSPA  | SWITCH |
| `AG-17` | `POST`            | `/authorizations`*2                 | SWITCH | PISP   |
| `AG-26` | `POST`            | `/authorizations`                   | PISP   | SWITCH |
| `AG-28` | `GET`             | `/endpoints/FIDO/{ID}`              | SWITCH | ALS?   |
| `AG-30` | `POST`            | `/performVerification`*3           | SWITCH | FIDO   |
| `AG-32` | `PUT`             | `/verificationResult/{ID}`*4      | FIDO   | SWITCH |
| `AG-34` | `PUT`             | `/authorizations/{ID}`              | SWITCH | DFSPA  |
| `TR-2`  | `PUT`             | `/transfers`*5                   | DFSPA  | SWITCH |
| `TR-4`  | `PUT`             | `/thirdPartyRequest/transfer/{ID}`  | SWITCH | PISP   |


> 0. As discussed, for now we will implement this as the existing `/transactionRequest`
> 1. This is something we haven't talked about yet. Does a `/thirdPartyRequest/transfer` to the switch create a `TransactionRequest`? Or will the DFSP need to implement a new callback for `/thirdPartyRequest/transfer`?
> 2. A new VERB for authorizations for the PISP use case
> 3. Do we want the FIDO server to be synchronous? I think not because it could be externally hosted in the future, but open for debate.
> 4. These resource names are up for debate
> 5. This may be outdated. See note above.

## Tools

To update the sequence diagrams in `./docs/out`, ensure you have the [PlantUML vscode plugin](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml&ssr=false#overview) installed.

1. `CMD + Shift + P`
2. Select `PlantUML: Export Workspace Diagrams`
3. Wait for the export to complete, and commit the changes
