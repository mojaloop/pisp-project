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
    { accountNickname: 'SpeXXXXXXXXnt', id: 'dfspa.username.5678', currency: 'USD' }
  ],
  actions: ['accounts.transfer'],
  callbackUri: 'pisp-app://callback.com'
}

const consentRequestsPutPartialData = {
  scopes: [
    {
      accountId: 'dfspa.username.5678',
      actions: [
        'accounts.transfer'
      ]
    }
  ],
  callbackUri: 'pisp-app://callback.com'
}

const linkingRequestConsentURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent`

const linkingRequestConsentPassCredentialBody = {
  id: 'HskU2gw4np09IUtYNHnxMM696jJHqvccUdBmd0xP6XEWwH0xLei1PUzDJCM19SZ3A2Ex0fNLw0nc2hrIlFnAtw',
  rawId: Buffer.from([30, 201, 20, 218, 12, 56, 158, 157, 61, 33, 75, 88, 52, 121, 241, 48, 206, 189,
    234, 50, 71, 170, 247, 28, 81, 208, 102, 119, 76, 79, 233, 113, 22, 192, 125, 49, 45,
    232, 181, 61, 76, 195, 36, 35, 53, 245, 38, 119, 3, 97, 49, 209, 243, 75, 195, 73, 220,
    218, 26, 200, 148, 89, 192, 183]).toString('base64'),
  response: {
    clientDataJSON: Buffer.from(
      [123, 34, 116, 121,
        112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104, 110, 46, 99, 114, 101, 97, 116,
        101, 34, 44, 34, 99, 104, 97, 108, 108, 101, 110, 103, 101, 34, 58, 34, 89, 122, 82, 104,
        90, 71, 70, 105, 89, 106, 77, 122, 90, 84, 107, 122, 77, 68, 90, 105, 77, 68, 77, 52, 77,
        68, 103, 52, 77, 84, 77, 121, 89, 87, 90, 109, 89, 50, 82, 108, 78, 84, 85, 50, 89, 122,
        85, 119, 90, 68, 103, 121, 90, 106, 89, 119, 77, 50, 89, 48, 78, 122, 99, 120, 77, 87,
        69, 53, 78, 84, 69, 119, 89, 109, 89, 122, 89, 109, 86, 108, 90, 106, 90, 107, 78, 103,
        34, 44, 34, 111, 114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 58, 47, 47,
        108, 111, 99, 97, 108, 104, 111, 115, 116, 58, 52, 50, 49, 56, 49, 34, 44, 34, 99, 114,
        111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115, 101, 125]
    ).toString('base64'),
    attestationObject: Buffer.from([163, 99, 102, 109, 116,
      102, 112, 97, 99, 107, 101, 100, 103, 97, 116, 116, 83, 116, 109, 116, 163, 99, 97, 108,
      103, 38, 99, 115, 105, 103, 88, 71, 48, 69, 2, 33, 0, 221, 137, 12, 243, 211, 177, 239,
      248, 228, 65, 210, 169, 42, 68, 38, 40, 168, 147, 155, 39, 179, 225, 234, 116, 151, 33,
      223, 232, 44, 47, 79, 85, 2, 32, 33, 237, 110, 217, 133, 0, 188, 128, 194, 36, 131, 7, 0,
      249, 46, 43, 66, 70, 135, 160, 121, 207, 244, 9, 36, 162, 22, 138, 10, 235, 128, 235, 99,
      120, 53, 99, 129, 89, 2, 193, 48, 130, 2, 189, 48, 130, 1, 165, 160, 3, 2, 1, 2, 2, 4,
      11, 5, 205, 83, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 11, 5, 0, 48, 46, 49, 44,
      48, 42, 6, 3, 85, 4, 3, 19, 35, 89, 117, 98, 105, 99, 111, 32, 85, 50, 70, 32, 82, 111,
      111, 116, 32, 67, 65, 32, 83, 101, 114, 105, 97, 108, 32, 52, 53, 55, 50, 48, 48, 54, 51,
      49, 48, 32, 23, 13, 49, 52, 48, 56, 48, 49, 48, 48, 48, 48, 48, 48, 90, 24, 15, 50, 48,
      53, 48, 48, 57, 48, 52, 48, 48, 48, 48, 48, 48, 90, 48, 110, 49, 11, 48, 9, 6, 3, 85, 4,
      6, 19, 2, 83, 69, 49, 18, 48, 16, 6, 3, 85, 4, 10, 12, 9, 89, 117, 98, 105, 99, 111, 32,
      65, 66, 49, 34, 48, 32, 6, 3, 85, 4, 11, 12, 25, 65, 117, 116, 104, 101, 110, 116, 105,
      99, 97, 116, 111, 114, 32, 65, 116, 116, 101, 115, 116, 97, 116, 105, 111, 110, 49, 39,
      48, 37, 6, 3, 85, 4, 3, 12, 30, 89, 117, 98, 105, 99, 111, 32, 85, 50, 70, 32, 69, 69,
      32, 83, 101, 114, 105, 97, 108, 32, 49, 56, 52, 57, 50, 57, 54, 49, 57, 48, 89, 48, 19,
      6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 33,
      26, 111, 177, 181, 137, 37, 203, 10, 193, 24, 95, 124, 42, 227, 168, 180, 136, 16, 20,
      121, 177, 30, 255, 245, 85, 224, 125, 151, 81, 189, 43, 23, 106, 37, 45, 238, 89, 236,
      227, 133, 153, 32, 91, 179, 234, 40, 191, 143, 215, 252, 125, 167, 92, 5, 66, 114, 174,
      72, 88, 229, 145, 252, 90, 163, 108, 48, 106, 48, 34, 6, 9, 43, 6, 1, 4, 1, 130, 196, 10,
      2, 4, 21, 49, 46, 51, 46, 54, 46, 49, 46, 52, 46, 49, 46, 52, 49, 52, 56, 50, 46, 49, 46,
      49, 48, 19, 6, 11, 43, 6, 1, 4, 1, 130, 229, 28, 2, 1, 1, 4, 4, 3, 2, 4, 48, 48, 33, 6,
      11, 43, 6, 1, 4, 1, 130, 229, 28, 1, 1, 4, 4, 18, 4, 16, 20, 154, 32, 33, 142, 246, 65,
      51, 150, 184, 129, 248, 213, 183, 241, 245, 48, 12, 6, 3, 85, 29, 19, 1, 1, 255, 4, 2,
      48, 0, 48, 13, 6, 9, 42, 134, 72, 134, 247, 13, 1, 1, 11, 5, 0, 3, 130, 1, 1, 0, 62, 254,
      163, 223, 61, 42, 224, 114, 87, 143, 126, 4, 208, 221, 90, 75, 104, 219, 1, 175, 232, 99,
      46, 24, 180, 224, 184, 115, 67, 24, 145, 25, 108, 24, 75, 235, 193, 213, 51, 162, 61,
      119, 139, 177, 4, 8, 193, 185, 170, 65, 78, 117, 118, 133, 91, 9, 54, 151, 24, 179, 72,
      175, 92, 239, 108, 176, 48, 134, 114, 214, 31, 184, 189, 155, 134, 161, 10, 166, 130,
      206, 140, 45, 78, 240, 144, 237, 80, 84, 24, 254, 83, 212, 206, 30, 98, 122, 40, 243,
      114, 3, 9, 88, 208, 143, 250, 89, 27, 196, 24, 128, 225, 142, 138, 12, 237, 26, 133, 128,
      127, 144, 150, 113, 65, 122, 11, 69, 50, 21, 179, 141, 193, 71, 42, 36, 73, 118, 64, 180,
      232, 107, 254, 196, 241, 84, 99, 155, 133, 184, 232, 128, 20, 150, 54, 36, 56, 53, 89, 1,
      43, 252, 135, 124, 11, 68, 236, 125, 167, 148, 210, 6, 84, 178, 154, 220, 29, 186, 92,
      80, 123, 240, 202, 109, 243, 82, 188, 205, 222, 116, 13, 46, 167, 225, 8, 36, 162, 206,
      57, 79, 144, 77, 29, 153, 65, 94, 58, 124, 69, 181, 254, 40, 122, 155, 203, 220, 105,
      142, 139, 220, 213, 180, 121, 138, 92, 237, 53, 222, 138, 53, 9, 2, 10, 20, 183, 38, 191,
      191, 57, 167, 68, 7, 156, 185, 143, 91, 157, 202, 9, 183, 195, 235, 188, 189, 162, 175,
      105, 3, 104, 97, 117, 116, 104, 68, 97, 116, 97, 88, 196, 73, 150, 13, 229, 136, 14, 140,
      104, 116, 52, 23, 15, 100, 118, 96, 91, 143, 228, 174, 185, 162, 134, 50, 199, 153, 92,
      243, 186, 131, 29, 151, 99, 65, 0, 0, 0, 4, 20, 154, 32, 33, 142, 246, 65, 51, 150, 184,
      129, 248, 213, 183, 241, 245, 0, 64, 30, 201, 20, 218, 12, 56, 158, 157, 61, 33, 75, 88,
      52, 121, 241, 48, 206, 189, 234, 50, 71, 170, 247, 28, 81, 208, 102, 119, 76, 79, 233,
      113, 22, 192, 125, 49, 45, 232, 181, 61, 76, 195, 36, 35, 53, 245, 38, 119, 3, 97, 49,
      209, 243, 75, 195, 73, 220, 218, 26, 200, 148, 89, 192, 183, 165, 1, 2, 3, 38, 32, 1, 33,
      88, 32, 88, 207, 228, 149, 233, 244, 178, 237, 152, 197, 205, 216, 254, 73, 108, 90, 49,
      183, 218, 195, 134, 83, 251, 6, 32, 10, 83, 119, 191, 221, 228, 85, 34, 88, 32, 100, 179,
      99, 141, 67, 52, 186, 225, 214, 53, 233, 224, 158, 119, 168, 41, 234, 227, 230, 253, 29,
      133, 238, 119, 253, 20, 18, 198, 106, 184, 55, 149]
    ).toString('base64')
  },
  type: 'public-key'
}

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
          authUri: 'http://localhost:6060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069&callbackUri=http://localhost:42181/flutter-web-auth.html'
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

      // dfsp simulator uses an authToken of 123456 to return a valid response
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '123456'
      }
      const expectedResponse = {
        consentId: expect.any(String),
        consentRequestId: consentRequestId,
        scopes: [
          {
            accountId: 'dfspa.username.5678',
            actions: [
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

      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            ...linkingRequestConsentPassCredentialBody
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

  // the auth-service stores the consent in a database
  // we currently do not have any endpoints to delete that consent entry atm
  // so we can only run one set of happy path for now
  // until we have either 1) route to delete consents or 2) more valid
  // test credentials
  describe.skip('Happy Path - OTP', (): void => {
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

      // dfsp simulator uses an authToken of 123456 to return a valid response
      const linkingRequestConsentAuthenticateRequest = {
        authToken: '123456'
      }
      const expectedResponse = {
        consentId: expect.any(String),
        consentRequestId: consentRequestId,
        scopes: [
          {
            accountId: 'dfspa.username.5678',
            actions: [
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

      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            ...linkingRequestConsentPassCredentialBody
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

    // TODO: how do we translate this test to the TTK?
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
          authUri: 'http://localhost:6060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069&callbackUri=http://localhost:42181/flutter-web-auth.html'
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
          authUri: 'http://localhost:6060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069&callbackUri=http://localhost:42181/flutter-web-auth.html'
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
            accountId: 'dfspa.username.5678',
            actions: [
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

      const linkingRequestConsentPassCredentialRequest = {
        credential: {
          payload: {
            ...linkingRequestConsentPassCredentialBody,
            // change the rawId so auth-service will reject the credential
            rawId: Buffer.from([31, 201, 20, 218, 12, 56, 158, 157, 61, 33, 75, 88, 52, 121, 241, 48, 206, 189,
              234, 50, 71, 170, 247, 28, 81, 208, 102, 119, 76, 79, 233, 113, 22, 192, 125, 49, 45,
              232, 181, 61, 76, 195, 36, 35, 53, 245, 38, 119, 3, 97, 49, 209, 243, 75, 195, 73, 220,
              218, 26, 200, 148, 89, 192, 183]).toString('base64')
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
