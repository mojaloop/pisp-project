# Transfer Outcome Notification

[#273](https://app.zenhub.com/workspaces/pisp-5e8457b05580fb04a7fd4878/issues/mojaloop/mojaloop/273) As a `PISP` I want to `be informed of the outcome of a transaction` so that `I can inform my customer`.

- Will use the PUT /thirdPartyRequest/transfer/{ID}
- The switch will initiate this call (not the DFSP)
- The challenge here is how the switch will know that a given transfer relates to a thirdPartyRequest/transfer/{ID}


## Questions:
- How will we implement these notifications?
  - And where should the notifications live? Should they be a part of the PISP Adapter? ml-api-adapter? central-event-processor?
  - This will depend on whether or not the 


## Current Notifications

### Design (`FSPIOP-API v1.1`)

- In version [1.1 of the Mojaloop Spec](https://github.com/mojaloop/mojaloop-specification/files/4469135/API.Definition_v1.1-draft_Updated-2020-04-13.docx), section "6.7.2.6 Commit Notification", a Payee DFSP can _ask_ the switch to be notified of a transfer outcome by setting the `transferState = RESERVED` in the `PUT /transfers/{ID}` call to the switch
  - The switch sees that the `transferState = RESERVED` (and not `COMMITTED`, and registers the callback for the PayeeDFSP)
- For future updates of the status of the transfer, the switch calls `PATCH /transfers/{ID}` to the Payee DFSP
- Notifications to the Payer DFSP are implicit and already contained in the `PUT /transfers/{ID}` callback.
- Any design for the PISP (or other 3rd party interest in a transfer) needs to take these existing methods into account.


### Implementation (as of `mojaloop/helm:v10.1.0`, `FSPIOP-API v1.0`)

- In the current implementation, this is handled instead by a `SEND_TRANSFER_CONFIRMATION_TO_PAYEE` config setting
- See the `mojaloop/ml-api-adapter` notification handler, specifically [`notification/index.js`](https://github.com/mojaloop/ml-api-adapter/blob/master/src/handlers/notification/index.js#L323)
- The current implementation is documented [here](https://docs.mojaloop.io/documentation/mojaloop-technical-overview/central-ledger/transfers/1.1.4.a-send-notification-to-participant.html):

> _[Rendered from `mojaloop/documentation...`](https://github.com/mojaloop/documentation/blob/master/mojaloop-technical-overview/central-ledger/assets/diagrams/sequence/seq-prepare-1.1.4.a.plantuml)_

<img src="./1.1.4.a_send_notification_to_participant.png" width=1000/>


- The current architecture of an E2E transfer is:

<img src="https://raw.githubusercontent.com/mojaloop/documentation/master/mojaloop-technical-overview/central-ledger/assets/diagrams/architecture/Transfers-Arch-End-to-End.svg" width=1000/>


## Proposed PISP/3rd Party Notification Design

- As the current `PUT /transfer/{ID}` notifications live in the `ml-api-adapter`, it makes sense for the new PISP notifications to also live here
  - Depending on the [_new ThirdParty-API design decision_](./design-decisions/README.md), we could put this functionality in a `thirdparty-api-adapter`
  - For now, let's just say we are going to use the `ml-api-adapter`

- The ml-api-adapter will use the `PUT /thirdPartyRequest/transfer/{ID}` from the Switch to the PISP
- 




## From a `thirdPartyRequest/transfer/{ID}` to a `/transfer/{ID}`

[todo: 
  - how do we do this? This is hard...
  - need to read more about v2.0 changes to spec
]