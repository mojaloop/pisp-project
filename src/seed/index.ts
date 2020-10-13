import config, { DFSPParticipant, ParticipantType, PISPParticipant } from './config'

import hubSteps from './steps/hubSteps'
import oracleSteps from './steps/oracleSteps'
import makeParticipantSteps from './steps/participantSteps'
import makePartySteps from './steps/partySteps'
import { SeedCollection } from './types'


const collections: Array<SeedCollection> = [
  hubSteps(config),
  oracleSteps(config),

  // Generate a set of participant steps for each participant
  ...config.participants.map(p => makeParticipantSteps(p as unknown as PISPParticipant | DFSPParticipant)(config)),

  // Generate a set of party steps for DFSP participants
  ...config.participants
    .filter(p => p.type === ParticipantType.DFSP)
    .map(p => makePartySteps(p as unknown as DFSPParticipant)(config)),
]

export default collections
