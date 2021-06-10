/* eslint-disable import/no-named-as-default-member */
import TestEnv from './TestEnv'
import axios from 'axios'

const consentRequestsPost = {
  toParticipantId: 'dfspa',
  userId: 'dfspa.username',
  consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
  authChannels: [
    'WEB',
    'OTP'
  ],
  accounts: [
    { accountNickname: 'XXXXXXnt', id: 'dfspa.username.1234', currency: 'ZAR' },
    { accountNickname: 'SpeXXXXXXXXnt', id: 'dfspa.username.5678', currency: 'USD' }
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

const consentRequestsURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent`

// todo: rewrite tests once https://github.com/mojaloop/thirdparty-scheme-adapter/pull/102
//       is merged and new image is published
describe.skip('/consentRequests: test', (): void => {
  it('WEB: validateRequest should be success', async (): Promise<void> => {
    // mojaloop-simulator returns WEB response for id 'b51ec534-ee48-4575-b6a9-ead2955b8069'
    const consentRequest = {
      ...consentRequestsPost,
      consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
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
    // mojaloop-simulator returns OTP response for id 'c51ec534-ee48-4575-b6a9-ead2955b8069'
    const consentRequest = {
      ...consentRequestsPost,
      consentRequestId: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
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
    console.log(consentRequestsResponse)
    expect(consentRequestsResponse.status).toEqual(200)
    expect(consentRequestsResponse.data).toEqual(expectedResponse)
  })

  it('validateRequest should be errored', async (done): Promise<void> => {
    // mojaloop-simulator returns Error response for id 'd51ec534-ee48-4575-b6a9-ead2955b8069'
    const consentRequest = {
      ...consentRequestsPost,
      consentRequestId: 'e51ec534-ee48-4575-b6a9-ead2955b8069',
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
