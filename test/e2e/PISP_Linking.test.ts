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
    let consentId: string

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

      // store the consentId for future assertion
      consentId = consentRequestsResponse.data.consent.consentId

      // Print consentId for debugging purposes:
      console.log(`consentRequestId: ${consentRequestId} ---> consentId: ${consentId}`)
    })

    it('/linking/request-consent/consentRequestId/pass-credential should be success', async (): Promise<void> => {
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

    it('created a CONSENT entry with the CONSENT Oracle', async (): Promise<void> => {
      const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${consentId}`
      const options = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.participants+json;version=1.0',
          Accept: 'application/vnd.interoperability.participants+json;version=1',
          'FSPIOP-Source': 'als',
          Date: new Date().toUTCString()
        }
      }

      // give the ALS some time to process the request
      await new Promise(resolve => setTimeout(resolve, 200))

      const result = await axios.get(participantsURI, options)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toEqual(
        expect.objectContaining({
          partyList: [
            expect.objectContaining({
              id: consentId,
              fspId: 'centralAuth'
            })
          ]
        })
      )
    })
  })

  describe('Happy Path - OTP', (): void => {
    let consentId: string

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

      // store the consentId for future assertion
      consentId = consentRequestsResponse.data.consent.consentId
    })

    it('/linking/request-consent/consentRequestId/pass-credential should be success', async (): Promise<void> => {
      const consentRequestId = 'c51ec534-ee48-4575-b6a9-ead2955b8069'
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

    it('created a CONSENT entry with the CONSENT Oracle', async (): Promise<void> => {
      const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${consentId}`
      const options = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.participants+json;version=1.0',
          Accept: 'application/vnd.interoperability.participants+json;version=1',
          'FSPIOP-Source': 'als',
          Date: new Date().toUTCString()
        }
      }
      // give the ALS some time to process the request
      await new Promise(resolve => setTimeout(resolve, 200))

      const result = await axios.get(participantsURI, options)
      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toEqual(
        expect.objectContaining({
          partyList: [
            expect.objectContaining({
              id: consentId,
              fspId: 'centralAuth'
            })
          ]
        })
      )
    })
  })

  describe('PISP Linking flow - Error @ consent request stage', (): void => {
    it('validateRequest should be errored', async (done): Promise<void> => {
      // validateRequest is a backend call to a DFSP.
      // dfspA's simulator rules throws an error on a request containing the
      // consentRequestId of 'd51ec534-ee48-4575-b6a9-ead2955b8069'.
      // dfspA's thirdparty-scheme-adapter then sends a PUT /consents/{ID}/error
      // callback to the pisp containing that error.
      const linkingRequestConsentRequest = {
        ...consentRequestsPost,
        consentRequestId: 'd51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }
      const expectedResponse = {
        errorInformation: {
          errorCode: '7203',
          errorDescription: 'FSP does not support any requested authentication channels'
        },
        currentState: 'errored'
      }
      await axios.post(linkingRequestConsentURI, linkingRequestConsentRequest)
        .catch(error => {
          expect(error.response.status).toEqual(500)
          expect(error.response.data).toEqual(expectedResponse)
          done()
        })
    })
  })

  describe('PISP Linking flow - Error @ consent request authenticate stage', (): void => {
    it('request consent should be success', async (): Promise<void> => {
      // proceed with web happy flow using consentRequestID
      // b51ec534-ee48-4575-b6a9-ead2955b8069
      const linkingRequestConsentRequest = {
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
      const consentRequestsResponse = await axios.post(linkingRequestConsentURI, linkingRequestConsentRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data).toEqual(expectedResponse)
    })

    it('request consent authenticate should be errored', async (): Promise<void> => {
      const consentRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentAuthenticateURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/authenticate`
      // validateAuthToken is a backend call to a DFSP.
      // dfspA's simulator rules uses an authToken of 654321 to return a
      // invalid authToken response.
      // that invalid response is then converted into a Mojaloop error and
      // sent back.
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '654321'
      }
      const expectedResponse = {
        errorInformation: {
          errorCode: '7205',
          errorDescription: 'OTP failed validation'
        },
        currentState: 'errored'
      }

      await axios.patch(linkingRequestConsentAuthenticateURI, linkingRequestConsentAuthenticateRequest)
        .catch(error => {
          expect(error.response.status).toEqual(500)
          expect(error.response.data.currentState).toEqual('errored')
          expect(error.response.data).toEqual(expectedResponse)
        })
    })
  })

  describe('PISP Linking flow - Error @ consent request register credential stage', (): void => {
    it('request consent should be success', async (): Promise<void> => {
      // proceed with web happy flow using consentRequestID
      // b51ec534-ee48-4575-b6a9-ead2955b8069
      const linkingRequestConsentRequest = {
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
      const consentRequestsResponse = await axios.post(linkingRequestConsentURI, linkingRequestConsentRequest)
      expect(consentRequestsResponse.status).toEqual(200)
      expect(consentRequestsResponse.data).toEqual(expectedResponse)
    })

    it('request consent authenticate should be success', async (): Promise<void> => {
      const consentRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentAuthenticateURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/authenticate`
      // proceed with web happy flow using authToken of 123456
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

    it('request consent pass credential should be errored', async (): Promise<void> => {
      const consentRequestId = 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentPassCredentialURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/pass-credential`

      // ttk uses an credential.payload.id of below for a error response
      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            id: 'credential id error: identifier of pair of keys, base64 encoded, min length 59',
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
        currentState: 'errored',
        errorInformation: {
          errorCode: '7213',
          errorDescription: 'Consent is invalid'
        }
      }
      await axios.post(linkingRequestConsentPassCredentialURI, linkingRequestConsentPassCredentialRequest)
        .catch(error => {
          expect(error.response.status).toEqual(500)
          expect(error.response.data.currentState).toEqual('errored')
          expect(error.response.data).toEqual(expectedResponse)
        })
    })
  })
})
