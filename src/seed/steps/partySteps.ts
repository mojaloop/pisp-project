import { DFSPParticipant, GlobalConfig } from "../config";
import Requests from '../requests';
import { SeedStep } from '../types';
import { wrapWithRunResult } from '../utils';
import { ConstConfig, GenericSteps } from './genericSteps';


function makeStepsForParticipantAndParties(config: GlobalConfig, participant: DFSPParticipant): Array<SeedStep> {
  const steps: Array<SeedStep> = []

  participant.parties.forEach(party => {
    // For each party
    // 1. Register at the ALS
    // 2. Create an entry in the Simulator
    // TODO: Anything else?

    steps.push({
      name: `register with ALS: ${party.idType}/${party.idValue}`,
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postALSParticipant(config.urls.als, {
        headers: {
          'FSPIOP-Source': participant.id
        },
        idType: party.idType,
        idValueOrSubType: party.idValue,
        body: {
          fspId: participant.id,
          currency: config.currency
        }
      }))
    })

    steps.push({
      name: `register with simulator ${party.idType}/${party.idValue}`,
      // Will fail if already exists
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postSimulatorParty(participant.simulatorAdminUrl, {
        body: {
          ...party
        }
      }))
    })
  })

  return steps
}

function makePartySteps(participant: DFSPParticipant) {
  const constConfig: ConstConfig =  {
    id: `parties_for_participant_${participant.id}`,
    name: `Parties Steps - ${participant.id}`,
    description: `Sets up parties for ${participant.id}`,
    ignoreFailure: false,
  }
  const stepGenerator = (config: GlobalConfig) => makeStepsForParticipantAndParties(config, participant)

  return (config: GlobalConfig) => new GenericSteps(constConfig, config, stepGenerator)
}


export default makePartySteps
