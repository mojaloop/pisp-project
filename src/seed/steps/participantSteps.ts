
import { v4 as uuid} from 'uuid'

import Requests from '../requests';
import { wrapWithRunResult } from '..//utils';
import { DFSPParticipant, GlobalConfig, Participant, ParticipantType } from '../config';
import { SeedStep } from '../types';
import { ConstConfig, GenericSteps } from './genericSteps';


const makeCommonSteps = (_constConfig: ConstConfig, globalConfig: GlobalConfig, participant: Participant): Array<SeedStep> => {
  return [
    {
      name: 'add participant',
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postParticipants(globalConfig.urls.centralLedger, {
        body: {
          name: participant.id,
          currency: globalConfig.currency
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_PARTIES_GET`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_PARTIES_GET',
          value: `${participant.fspiopCallbackUrl}/parties/{{partyIdType}}/{{partyIdentifier}}`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_PARTIES_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_PARTIES_PUT',
          value: `${participant.fspiopCallbackUrl}/parties/{{partyIdType}}/{{partyIdentifier}}`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR',
          value: `${participant.fspiopCallbackUrl}/parties/{{partyIdType}}/{{partyIdentifier}}/error`
        }
      }))
    },

    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE',
          // TODO: this looks wrong to me!
          value: `${participant.fspiopCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_POST',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_PUT',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_PUT_ERROR',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_REQUEST_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_REQUEST_POST',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_REQUEST_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_REQUEST_PUT',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_REQUEST_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_REQUEST_PUT_ERROR',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CREATE_CREDENTIAL_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CREATE_CREDENTIAL_POST',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_POST',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_GET`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_GET',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_PUT',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_CONSENT_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_CONSENT_PUT_ERROR',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    }
  ]
}

const makeDfspSteps = (_constConfig: ConstConfig, globalConfig: GlobalConfig, participant: DFSPParticipant): Array<SeedStep> => {
  return [
    {
      name: 'add initial position and limits',
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postParticipantsPositionAndLimits(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          currency: globalConfig.currency,
          limit: {
            type: "NET_DEBIT_CAP",
            value: 1000000
          },
          initialPosition: 0
        }
      }))
    },
    {
      name: 'create settlement account',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postAccount(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        accountId: participant.settlementAccountId,
        body: {
          transferId: uuid(),
          externalReference: "none",
          action: "recordFundsIn",
          reason: "Initial settlement amount",
          amount: {
            amount: "1000000",
            currency: globalConfig.currency
          }
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_PARTICIPANT_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_PARTICIPANT_PUT',
          value: `${participant.fspiopCallbackUrl}/participants/{{partyIdType}}/{{partyIdentifier}}`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR',
          value: `${participant.fspiopCallbackUrl}/participants/{{partyIdType}}/{{partyIdentifier}}/error`
        }
      }))
    },

    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR',
          value: `${participant.fspiopCallbackUrl}/participants/{{requestId}}/error`
        }
      }))
    },

    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_QUOTES`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_QUOTES',
          // TODO: this looks wrong to me...
          value: `${participant.fspiopCallbackUrl}/quotes`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_TRANSFER_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_TRANSFER_POST',
          value: `${participant.fspiopCallbackUrl}/transfers`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_TRANSFER_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_TRANSFER_PUT',
          value: `${participant.fspiopCallbackUrl}/transfers/{{transferId}}`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_TRANSFER_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_TRANSFER_ERROR',
          value: `${participant.fspiopCallbackUrl}/transfers/{{transferId}}/error`
        }
      }))
    },
    {
      name: 'register email `NET_DEBIT_CAP_ADJUSTMENT_EMAIL`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'NET_DEBIT_CAP_ADJUSTMENT_EMAIL',
          value: `email@example.com`
        }
      }))
    },
    {
      name: 'register email `SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_TRANSFER_PUT',
          value: `email@example.com`
        }
      }))
    },
    {
      name: 'register email `NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_TRANSFER_PUT',
          value: `email@example.com`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST',
          value: `${participant.fspiopCallbackUrl}/bulkTransfers`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT',
          value: `${participant.fspiopCallbackUrl}/bulkTransfers/{{id}}`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR',
          value: `${participant.fspiopCallbackUrl}/bulkTransfers/{{id}}/error`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_AUTH_PUT`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_AUTH_PUT',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_AUTH_PUT_ERROR`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_AUTH_PUT_ERROR',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `FSPIOP_CALLBACK_URL_AUTHORIZATIONS`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'FSPIOP_CALLBACK_URL_AUTHORIZATIONS',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
  ]
}

const makePispSteps = (_constConfig: ConstConfig, globalConfig: GlobalConfig, participant: Participant): Array<SeedStep> => {
  return [
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_PATCH`',
      // TODO: fix this - we shouldn't have to ignore failure here
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_PATCH',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
    {
      name: 'register endpoint `TP_CB_URL_TRANSACTION_REQUEST_AUTH_POST`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postEndpoint(globalConfig.urls.centralLedger, {
        participantId: participant.id,
        body: {
          type: 'TP_CB_URL_TRANSACTION_REQUEST_AUTH_POST',
          value: `${participant.thirdpartyCallbackUrl}`
        }
      }))
    },
  ]
}


function makeParticipantSteps(participant: Participant) {
  const constConfig: ConstConfig = {
    id: `participant_${participant.id}`,
    name: `Participant Steps - ${participant.id}`,
    description: `Sets up participant steps for ${participant.id}`,
    ignoreFailure: false,
  }

  const stepGenerator = (config: GlobalConfig) => {
    let steps = makeCommonSteps(constConfig, config, participant)

    switch (participant.type) {
      case ParticipantType.DFSP: {
        return steps.concat(makeDfspSteps(constConfig, config, participant))
      }
      case ParticipantType.PISP: {
        return steps.concat(makePispSteps(constConfig, config, participant))
      }
    }
  }

  return (config: GlobalConfig) => new GenericSteps(constConfig, config, stepGenerator)
}

export default makeParticipantSteps
