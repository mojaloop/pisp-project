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


#### Linking - Endpoints 

DISC-C GET /participants/role/pisp 

** does thec allbacul url need to be validated by the switch?
** in delegaction, can the consent/consentRequest time out? 
** what happens if the user doesn't give consent?


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
| `LK-6`  | `GET`             | `/parties/{Type}/{ID}`              | SWITCH | ALS    |
| `LK-8`  | `GET`             | `/parties/{Type}/{ID}`              | SWITCH | DFSPB  |
| `LK-11` | `PUT`             | `/parties/{Type}/{ID}`              | DFSPB  | SWITCH |
| `LK-13` | `PUT`             | `/parties/{Type}/{ID}`              | SWITCH | PISP   |
| `LK-19` | `POST`            | `/thirdPartyRequests/transfer`*0    | PISP   | SWITCH |
| `LK-22` | `POST`            | `/thirdPartyRequests/transfer`*1    | SWITCH | DFSPA  |
PUT /thirdPartyRequest/transfer/{ID} or /error from DFSPA -> SWITCH -> PISP
"yes, this is a legit request, and looks good to me, I'm going to try and make it happen
| `AG-1`  | `POST`            | `/quotes`                           | DFSPA  | SWITCH |
| `AG-3`  | `POST`            | `/quotes`                           | SWITCH | DFSPB  |
| `AG-6`  | `PUT`             | `/quotes/{ID}`                      | DFSPB | SWITCH  |
| `AG-8`  | `PUT`             | `/quotes/{ID}`                      | SWITCH | DFSPA  |
| `AG-15` | `POST`            | `/authorizations`                   | DFSPA  | SWITCH |
| `AG-17` | `POST`            | `/authorizations`*2                 | SWITCH | PISP   |
| `AG-26` | `PUT`             | `/authorizations/{ID}`              | PISP   | SWITCH |
| `AG-28` | `GET`             | `/endpoints/FIDO/{ID}`              | SWITCH | ALS?   |
| `AG-30` | `POST`            | `/performVerification`*3            | SWITCH | FIDO   |
| `AG-32` | `PUT`             | `/verificationResult/{ID}`*4        | FIDO   | SWITCH |
| `AG-34` | `PUT`             | `/authorizations/{ID}`              | SWITCH | DFSPA  |
| `TR-2`  | `PUT`             | `/transfers`*5                      | DFSPA  | SWITCH |
** need to figure out notifications/how the switch _knows_ to inform PISP
- when we issue the /tranfer, that's between DFSPA  + DFSPB, 
- contains a transferId that is related to the `thirdPartyRequest`
  - how does the PISP know which transaction this transferId related
  - tx id will be set in the POST Authorizations
  - how do we get from txid to a transferId relating to a specific transfer 
    - ILP packet is in transfer request, but encoded... so need to figure this piece out

  - For now, assume that the transaction object will contain the transactionId...

| `TR-4`  | `PUT`             | `/thirdPartyRequest/transfer/{ID}`  | SWITCH | PISP   |
- inform the PISP with this endpoint

| `TR-4`  | `PUT`             | `/thirdPartyRequest/transfer/{ID}/error`  | SWITCH | PISP   |
  - 



> 0. As discussed, for now we will implement this as the existing `/transactionRequest`
> 1. This is something we haven't talked about yet. Does a `/thirdPartyRequest/transfer` to the switch create a `TransactionRequest`? Or will the DFSP need to implement a new callback for `/thirdPartyRequest/transfer`? YES
> 2. A new VERB for authorizations for the PISP use case 
> 3. Do we want the FIDO server to be synchronous? I think not because it could be externally hosted in the future, but open for debate.
> 4. These resource names are up for debate
> 5. This may be outdated. See note above.
> 6. Where does the challenge come from? It should come from the FIDO/auth-service, but we can't alter the `POST /authorizations` in the switch to inject the challenge
  we could use a hash of the quote or quoteId
  - Want to digitally sign something _meaningful_

** what happens to the signed challenge? be able to verify that the response was signed with the private key associated to the fido public key


- internal fido: failure case for FIDO -> forward error to DFSP
- external fido: forward whole /authorizations/{id} to the DFSP to take care of

## Tools

To update the sequence diagrams in `./docs/out`, ensure you have the [PlantUML vscode plugin](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml&ssr=false#overview) installed.

1. `CMD + Shift + P`
2. Select `PlantUML: Export Workspace Diagrams`
3. Wait for the export to complete, and commit the changes
