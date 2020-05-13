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


## Tools

To update the sequence diagrams in `./docs/out`, ensure you have the [PlantUML vscode plugin](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml&ssr=false#overview) installed.

1. `CMD + Shift + P`
2. Select `PlantUML: Export Workspace Diagrams`
3. Wait for the export to complete, and commit the changes
