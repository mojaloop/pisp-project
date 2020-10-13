import config, { DFSPParticipant, ParticipantType } from './config'

import hubSteps from './steps/hubSteps'
import oracleSteps from './steps/oracleSteps'
import makeParticipantSteps from './steps/participantSteps'
import makePartySteps from './steps/partySteps'
import { SeedCollection } from './types'


const collections: Array<SeedCollection> = [
  hubSteps(config),
  oracleSteps(config),

  // Generate a set of participant steps for each participant
  ...config.participants.map(p => makeParticipantSteps(p)(config)),

  // Generate a set of party steps for DFSP participants
  ...config.participants
    .filter(p => p.type === ParticipantType.DFSP)
    // we cast here because TS isn't smart enough to figure out the types after a filter
    .map(p => makePartySteps(p as unknown as DFSPParticipant)(config)),
]

export default collections
