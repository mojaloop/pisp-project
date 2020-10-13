import * as SDKStandardComponents from '@mojaloop/sdk-standard-components'

export interface GlobalConfig {
  currency: SDKStandardComponents.TCurrency,
  // Urls to talk to services
  urls: {
    als: string,
    alsAdmin: string,
    centralLedger: string
  },
  // Urls to be passed into internal services
  applicationUrls: {
    oracle: string,
  },
  participants: Array<Participant>
}

export enum ParticipantType {
  DFSP = 'DFSP',
  PISP = 'PISP'
}

export interface PartyAccount {
  currency: SDKStandardComponents.TCurrency,
  description: string,
  address: string,
}
export interface Party {
  idType: string,
  idValue: string,
  displayName: string,
  firstName: string,
  middleName?: string,
  lastName: string,
  dateOfBirth: string,
  accounts: Array<PartyAccount>
}

export type Participant = DFSPParticipant | PISPParticipant
export interface DFSPParticipant {
  id: string,
  type: ParticipantType.DFSP
  settlementAccountId: string
  simulatorAdminUrl: string,
  fspiopCallbackUrl: string,
  thirdpartyCallbackUrl: string,
  parties: Array<Party>
}

export interface PISPParticipant {
  id: string,
  type: ParticipantType.PISP
  fspiopCallbackUrl: string,
  thirdpartyCallbackUrl: string
}

// TODO: parse config with convict or something
const baseUrl = process.env.ELB_URL
const scheme = `http`
const currency = 'USD'

const config: GlobalConfig = {
  currency,
  urls: {
    als: `${scheme}://${baseUrl}/account-lookup-service`,
    alsAdmin: `${scheme}://${baseUrl}/account-lookup-service-admin`,
    centralLedger: `${scheme}://${baseUrl}/central-ledger`
  },
  applicationUrls: {
    oracle: `${scheme}://${baseUrl}/oracle-simulator`,
  },
  participants: [
    {
      id: 'dfspa',
      type: ParticipantType.DFSP,
      // TODO: this is a hack for now, but we actually need to query the admin-api
      // to get this value before setting it :(
      settlementAccountId: '4',
      // For our demo, Participants are on the same deployment as switch
      simulatorAdminUrl: `${scheme}://${baseUrl}/dfspa/mojaloop-simulator/test`,
      fspiopCallbackUrl: `${scheme}://${baseUrl}/dfspa/sdk-scheme-adapter/inbound`,
      thirdpartyCallbackUrl: `${scheme}://${baseUrl}/dfspa/thirdparty-scheme-adapter/inbound`,
      parties: [
        {
          displayName: "Alice Alpaca",
          firstName: "Alice",
          middleName: "K",
          lastName: "Alpaca",
          dateOfBirth: "1970-01-01",
          idType: "MSISDN",
          idValue: "123456789",
          accounts: [
            {
              currency,
              description: "savings",
              address: "moja.amber.53451233-b82a5456a-4fa9-838b-123456789"
            },
            {
              currency,
              description: "checkings",
              address: "moja.amber.8f027046-b8236345a-4fa9-838b-123456789"
            }
          ]
        }
      ]
    },
    {
      id: 'dfspb',
      type: ParticipantType.DFSP,
      // TODO: this is a hack for now, but we actually need to query the admin-api
      // to get this value before setting it :(
      settlementAccountId: '6',
      // For our demo, Participants are on the same deployment as switch
      simulatorAdminUrl: `${scheme}://${baseUrl}/dfspa/mojaloop-simulator/test`,
      fspiopCallbackUrl: `${scheme}://${baseUrl}/dfspb/sdk-scheme-adapter/inbound`,
      thirdpartyCallbackUrl: `${scheme}://${baseUrl}/dfspb/thirdparty-scheme-adapter/inbound`,
      parties: [
        {
          displayName: "Bob Babirusa",
          firstName: "Bob",
          middleName: "O",
          lastName: "Babirusa",
          dateOfBirth: "1970-01-01",
          idType: "MSISDN",
          idValue: "987654321",
          accounts: [
            {
              currency,
              description: "savings",
              address: "moja.burgundy.76542756-f49gk439f-6a5f-543d-987654321"
            },
            {
              currency,
              description: "checkings",
              address: "moja.burgundy.43638980-f49gk439f-6a5f-543d-987654321"
            }
          ]
        }
      ]
    },
    {
      id: 'pispa',
      type: ParticipantType.PISP,
      // For PISP, 3p-scheme-adapter gets callbacks from switch
      fspiopCallbackUrl: `${scheme}://${baseUrl}/pispa/thirdparty-scheme-adapter/inbound`,
      thirdpartyCallbackUrl: `${scheme}://${baseUrl}/pispa/thirdparty-scheme-adapter/inbound`
    },
  ]
}

export default config
