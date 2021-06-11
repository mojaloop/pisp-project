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

const consentRequestsPutPartialData = {
  scopes: [
    {
      accountId: 'dfspa.username.1234',
      actions: [
        'accounts.getBalance',
        'accounts.transfer'
      ]
    },
    {
      accountId: 'dfspa.username.5678',
      actions: [
        'accounts.getBalance',
        'accounts.transfer'
      ]
    }
  ],
  callbackUri: 'pisp-app://callback.com'
}

const linkingRequestConsentURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent`

describe('Account Linking', (): void => {
  describe('Happy Path - Web', (): void => {
    it('/linking/request-consent should be success', async (): Promise<void> => {
      // dfspa mojaloop-simulator returns WEB response for id 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const consentRequest = {
        ...consentRequestsPost,
        consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }
      const expectedResponse = {
        channelResponse: {
          ...consentRequestsPutPartialData,
          authChannels: ['WEB'],
          consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          authUri: 'dfspa.com/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069'
        },
        currentState: 'WebAuthenticationChannelResponseRecieved'
      }

      const consentRequestsResponse = await axios.post(linkingRequestConsentURI, consentRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data).toEqual(expectedResponse)
    })

    it('/linking/request-consent/consentRequestId/authenticate should be success', async (): Promise<void> => {
      const consentRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentAuthenticateURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/authenticate`

      // ttk uses an authToken of 123456 to return a valid response
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '123456'
      }
      const expectedResponse = {
        consentId: expect.any(String),
        consentRequestId: consentRequestId,
        scopes: [
          {
            accountId: 'dfspa.username.1234',
            actions: [
              'accounts.getBalance',
              'accounts.transfer'
            ]
          },
          {
            accountId: 'dfspa.username.5678',
            actions: [
              'accounts.getBalance',
              'accounts.transfer'
            ]
          }
        ]
      }
      const consentRequestsResponse = await axios.patch(linkingRequestConsentAuthenticateURI, linkingRequestConsentAuthenticateRequest)

      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data.currentState).toEqual('consentReceivedAwaitingCredential')
      expect(consentRequestsResponse.data.consent).toEqual(expectedResponse)
    })

    // todo: need to update the scheme adapter to forward put /participant/{Type}/{ID}
    //       requests and patch /consent/{ID} requests to finish this test
    //       DFSP is waiting on that ALS request which should be the final
    //       call that needs to be passed for the flow to complete.
    it.skip('/linking/request-consent/consentRequestId/pass-credential should be success', async (): Promise<void> => {
      const consentRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentPassCredentialURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/pass-credential`

      // ttk uses an credential.payload.id of below for a verified response
      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            id: 'credential id: identifier of pair of keys, base64 encoded, min length 59',
            rawId: 'raw credential id: identifier of pair of keys, base64 encoded, min length 59',
            response: {
              clientDataJSON: 'clientDataJSON-must-not-have-fewer-than-121-' +
                'characters Lorem ipsum dolor sit amet, consectetur adipiscing ' +
                'elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                'aliqua.',
              attestationObject: 'attestationObject-must-not-have-fewer-than-' +
                '306-characters Lorem ipsum dolor sit amet, consectetur ' +
                'adipiscing elit, sed do eiusmod tempor incididunt ut ' +
                'labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
                'quis nostrud exercitation ullamco laboris nisi ut aliquip ' +
                'ex ea commodo consequat. Duis aute irure dolor in reprehenderit ' +
                'in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            },
            type: 'public-key'
          }
        }
      }
      const expectedResponse = {
        credential: {
          status: 'VERIFIED'
        },
        currentState: 'accountsLinked'
      }
      const consentRequestsResponse = await axios.post(linkingRequestConsentPassCredentialURI, linkingRequestConsentPassCredentialRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data.currentState).toEqual('accountsLinked')
      expect(consentRequestsResponse.data).toEqual(expectedResponse)
    })
  })

  describe('Happy Path - OTP', (): void => {
    it('/linking/request-consent should be success', async (): Promise<void> => {
      // dfspa mojaloop-simulator returns OTP response for id 'c51ec534-ee48-4575-b6a9-ead2955b8069'
      const consentRequest = {
        ...consentRequestsPost,
        consentRequestId: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }

      const expectedResponse = {
        channelResponse: {
          ...consentRequestsPutPartialData,
          consentRequestId: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
          authChannels: ['OTP']
        },
        currentState: 'OTPAuthenticationChannelResponseRecieved'
      }

      const consentRequestsResponse = await axios.post(linkingRequestConsentURI, consentRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data).toEqual(expectedResponse)
    })

    it('/linking/request-consent/consentRequestId/authenticate should be success', async (): Promise<void> => {
      const consentRequestId = 'c51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentAuthenticateURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/authenticate`

      // ttk uses an authToken of 123456 to return a valid response
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '123456'
      }
      const expectedResponse = {
        consentId: expect.any(String),
        consentRequestId: consentRequestId,
        scopes: [
          {
            accountId: 'dfspa.username.1234',
            actions: [
              'accounts.getBalance',
              'accounts.transfer'
            ]
          },
          {
            accountId: 'dfspa.username.5678',
            actions: [
              'accounts.getBalance',
              'accounts.transfer'
            ]
          }
        ]
      }
      const consentRequestsResponse = await axios.patch(linkingRequestConsentAuthenticateURI, linkingRequestConsentAuthenticateRequest)

      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data.currentState).toEqual('consentReceivedAwaitingCredential')
      expect(consentRequestsResponse.data.consent).toEqual(expectedResponse)
    })

    // todo: need to update the scheme adapter to forward put /participant/{Type}/{ID}
    //       requests and patch /consent/{ID} requests to finish this test
    //       DFSP is waiting on that ALS request which should be the final
    //       call that needs to be passed for the flow to complete.
    it.skip('/linking/request-consent/consentRequestId/pass-credential should be success', async (): Promise<void> => {
      const consentRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentPassCredentialURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/pass-credential`

      // ttk uses an credential.payload.id of below for a verified response
      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            id: 'credential id: identifier of pair of keys, base64 encoded, min length 59',
            rawId: 'raw credential id: identifier of pair of keys, base64 encoded, min length 59',
            response: {
              clientDataJSON: 'clientDataJSON-must-not-have-fewer-than-121-' +
                'characters Lorem ipsum dolor sit amet, consectetur adipiscing ' +
                'elit, sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                'aliqua.',
              attestationObject: 'attestationObject-must-not-have-fewer-than-' +
                '306-characters Lorem ipsum dolor sit amet, consectetur ' +
                'adipiscing elit, sed do eiusmod tempor incididunt ut ' +
                'labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
                'quis nostrud exercitation ullamco laboris nisi ut aliquip ' +
                'ex ea commodo consequat. Duis aute irure dolor in reprehenderit ' +
                'in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            },
            type: 'public-key'
          }
        }
      }
      const expectedResponse = {
        credential: {
          status: 'VERIFIED'
        },
        currentState: 'accountsLinked'
      }
      const consentRequestsResponse = await axios.post(linkingRequestConsentPassCredentialURI, linkingRequestConsentPassCredentialRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data.currentState).toEqual('accountsLinked')
      expect(consentRequestsResponse.data).toEqual(expectedResponse)
    })
  })

  // todo: need to update the api adapter to forward put /participant/{Type}/{ID}/error
  //       requests and put /consent/{ID}/error requests to finish this test
  //       DFSP is waiting on that ALS request which should be the final
  //       call that needs to be passed for the flow to complete.
  it.todo('error tests')
})
