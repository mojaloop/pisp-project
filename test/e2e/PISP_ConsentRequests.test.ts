/* eslint-disable import/no-named-as-default-member */
import TestEnv from './TestEnv'
import axios from 'axios'

const consentRequestsPost = {
  toParticipantId: 'dfsp',
  id: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
  initiatorId: 'pisp',
  authChannels: [
    'WEB',
    'OTP'
  ],
  scopes: [
    {
      accountId: 'dfspa.username.1234',
      actions: [
        'accounts.transfer',
        'accounts.getBalance'
      ]
    },
    {
      accountId: 'dfspa.username.5678',
      actions: [
        'accounts.transfer',
        'accounts.getBalance'
      ]
    }
  ],
  callbackUri: 'pisp-app://callback.com'
}

const consentRequestsPut = {
  scopes: [
    {
      accountId: 'dfspa.username.1234',
      actions: [
        'accounts.transfer',
        'accounts.getBalance'
      ]
    },
    {
      accountId: 'dfspa.username.5678',
      actions: [
        'accounts.transfer',
        'accounts.getBalance'
      ]
    }
  ],
  callbackUri: 'pisp-app://callback.com',

  authChannels: [
    'WEB'
  ],
  initiatorId: 'pisp'
}

const consentRequestsURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/consentRequests`

describe('/consentRequests: test', (): void => {
  it('WEB: validateRequest should be success', async (): Promise<void> => {
    // mojaloop-simulator returns WEB reponse for id 'b51ec534-ee48-4575-b6a9-ead2955b8069'
    const consentRequest = {
      ...consentRequestsPost,
      id: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
      toParticipantId: 'dfspa'
    }
    const expectedResponse = {
      consentRequests: { ...consentRequestsPut, authUri: 'dfspa.com/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069' },
      currentState: 'RequestIsValid'
    }
    const consentRequestsResponse = await axios.post(consentRequestsURI, consentRequest)
    expect(consentRequestsResponse.status).toEqual(200)
    expect(consentRequestsResponse.data).toEqual(expectedResponse)
  })

  it('OTP: validateRequest should be success', async (): Promise<void> => {
    // mojaloop-simulator returns OTP reponse for id 'c51ec534-ee48-4575-b6a9-ead2955b8069'
    const consentRequest = {
      ...consentRequestsPost,
      id: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
      toParticipantId: 'dfspa'
    }
    const expectedResponse = {
      consentRequests: {
        ...consentRequestsPut,
        authChannels: [
          'OTP'
        ],
        initiatorId: 'pisp'
      },
      currentState: 'RequestIsValid'
    }
    const consentRequestsResponse = await axios.post(consentRequestsURI, consentRequest)
    expect(consentRequestsResponse.status).toEqual(200)
    expect(consentRequestsResponse.data).toEqual(expectedResponse)
  })

  it('validateRequest should be errored', async (done): Promise<void> => {
    // mojaloop-simulator returns Error reponse for id 'd51ec534-ee48-4575-b6a9-ead2955b8069'
    const consentRequest = {
      ...consentRequestsPost,
      id: 'e51ec534-ee48-4575-b6a9-ead2955b8069',
      toParticipantId: 'dfspa'
    }
    const expectedResponse = {
      errorInformation: {
        errorCode: '7204',
        errorDescription: 'FSP does not support any requested scope actions'
      },
      currentState: 'errored'
    }
    await axios.post(consentRequestsURI, consentRequest)
      .catch(error => {
        expect(error.response.status).toEqual(500)
        expect(error.response.data).toEqual(expectedResponse)
        done()
      })
  })
})
