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
  rawId: 'HskU2gw4np09IUtYNHnxMM696jJHqvccUdBmd0xP6XEWwH0xLei1PUzDJCM19SZ3A2Ex0fNLw0nc2hrIlFnAtw==',
  response: {
    clientDataJSON: 'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiWXpSaFpHRmlZak16WlRrek1EWmlNRE00TURnNE1UTXlZV1ptWTJSbE5UVTJZelV3WkRneVpqWXdNMlkwTnpjeE1XRTVOVEV3WW1ZelltVmxaalprTmciLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjQyMTgxIiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ==',
    attestationObject: 'o2NmbXRmcGFja2VkZ2F0dFN0bXSjY2FsZyZjc2lnWEcwRQIhAN2JDPPTse/45EHSqSpEJiiok5sns+HqdJch3+gsL09VAiAh7W7ZhQC8gMIkgwcA+S4rQkaHoHnP9AkkohaKCuuA62N4NWOBWQLBMIICvTCCAaWgAwIBAgIECwXNUzANBgkqhkiG9w0BAQsFADAuMSwwKgYDVQQDEyNZdWJpY28gVTJGIFJvb3QgQ0EgU2VyaWFsIDQ1NzIwMDYzMTAgFw0xNDA4MDEwMDAwMDBaGA8yMDUwMDkwNDAwMDAwMFowbjELMAkGA1UEBhMCU0UxEjAQBgNVBAoMCVl1YmljbyBBQjEiMCAGA1UECwwZQXV0aGVudGljYXRvciBBdHRlc3RhdGlvbjEnMCUGA1UEAwweWXViaWNvIFUyRiBFRSBTZXJpYWwgMTg0OTI5NjE5MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIRpvsbWJJcsKwRhffCrjqLSIEBR5sR7/9VXgfZdRvSsXaiUt7lns44WZIFuz6ii/j9f8fadcBUJyrkhY5ZH8WqNsMGowIgYJKwYBBAGCxAoCBBUxLjMuNi4xLjQuMS40MTQ4Mi4xLjEwEwYLKwYBBAGC5RwCAQEEBAMCBDAwIQYLKwYBBAGC5RwBAQQEEgQQFJogIY72QTOWuIH41bfx9TAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQA+/qPfPSrgclePfgTQ3VpLaNsBr+hjLhi04LhzQxiRGWwYS+vB1TOiPXeLsQQIwbmqQU51doVbCTaXGLNIr1zvbLAwhnLWH7i9m4ahCqaCzowtTvCQ7VBUGP5T1M4eYnoo83IDCVjQj/pZG8QYgOGOigztGoWAf5CWcUF6C0UyFbONwUcqJEl2QLToa/7E8VRjm4W46IAUljYkODVZASv8h3wLROx9p5TSBlSymtwdulxQe/DKbfNSvM3edA0up+EIJKLOOU+QTR2ZQV46fEW1/ih6m8vcaY6L3NW0eYpc7TXeijUJAgoUtya/vzmnRAecuY9bncoJt8PrvL2ir2kDaGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj+SuuaKGMseZXPO6gx2XY0EAAAAEFJogIY72QTOWuIH41bfx9QBAHskU2gw4np09IUtYNHnxMM696jJHqvccUdBmd0xP6XEWwH0xLei1PUzDJCM19SZ3A2Ex0fNLw0nc2hrIlFnAt6UBAgMmIAEhWCBYz+SV6fSy7ZjFzdj+SWxaMbfaw4ZT+wYgClN3v93kVSJYIGSzY41DNLrh1jXp4J53qCnq4+b9HYXud/0UEsZquDeV'
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

      console.log('Consent is:', JSON.stringify(consentRequestsResponse.data.consent))

      // store the consentId for future assertion
      consentId = consentRequestsResponse.data.consent.consentId
    })

    it('/linking/request-consent/consentRequestId/pass-credential should be success', async (): Promise<void> => {
      const consentRequestId = 'c51ec534-ee48-4575-b6a9-ead2955b8069'
      const linkingRequestConsentPassCredentialURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestId}/pass-credential`

      const linkingRequestConsentPassCredentialRequest = {
        // Newly generated credential from front end
        credential: {
          payload: {
            id: 'UMyM71BqZ5G-NWnD1k3RtR6Ry_zQPLEh_ntU3zOO_3dur80eHxDOqJSvc83FnDczRTdv6hVCZ86Kuynrz5OKrw',
            rawId: 'UMyM71BqZ5G+NWnD1k3RtR6Ry/zQPLEh/ntU3zOO/3dur80eHxDOqJSvc83FnDczRTdv6hVCZ86Kuynrz5OKrw==',
            response: {
              attestationObject: 'o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEgwRgIhALlL18WMrdV+eVDKRoNgb3iTDNxANrbC93w/sG6BDcWEAiEA1WGNy/sZPJcboqHD8YgqXjxZni9ZT4M1EL+O+gRFWSxjeDVjgVkCwTCCAr0wggGloAMCAQICBAsFzVMwDQYJKoZIhvcNAQELBQAwLjEsMCoGA1UEAxMjWXViaWNvIFUyRiBSb290IENBIFNlcmlhbCA0NTcyMDA2MzEwIBcNMTQwODAxMDAwMDAwWhgPMjA1MDA5MDQwMDAwMDBaMG4xCzAJBgNVBAYTAlNFMRIwEAYDVQQKDAlZdWJpY28gQUIxIjAgBgNVBAsMGUF1dGhlbnRpY2F0b3IgQXR0ZXN0YXRpb24xJzAlBgNVBAMMHll1YmljbyBVMkYgRUUgU2VyaWFsIDE4NDkyOTYxOTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABCEab7G1iSXLCsEYX3wq46i0iBAUebEe//VV4H2XUb0rF2olLe5Z7OOFmSBbs+oov4/X/H2nXAVCcq5IWOWR/FqjbDBqMCIGCSsGAQQBgsQKAgQVMS4zLjYuMS40LjEuNDE0ODIuMS4xMBMGCysGAQQBguUcAgEBBAQDAgQwMCEGCysGAQQBguUcAQEEBBIEEBSaICGO9kEzlriB+NW38fUwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsFAAOCAQEAPv6j3z0q4HJXj34E0N1aS2jbAa/oYy4YtOC4c0MYkRlsGEvrwdUzoj13i7EECMG5qkFOdXaFWwk2lxizSK9c72ywMIZy1h+4vZuGoQqmgs6MLU7wkO1QVBj+U9TOHmJ6KPNyAwlY0I/6WRvEGIDhjooM7RqFgH+QlnFBegtFMhWzjcFHKiRJdkC06Gv+xPFUY5uFuOiAFJY2JDg1WQEr/Id8C0TsfaeU0gZUsprcHbpcUHvwym3zUrzN3nQNLqfhCCSizjlPkE0dmUFeOnxFtf4oepvL3GmOi9zVtHmKXO013oo1CQIKFLcmv785p0QHnLmPW53KCbfD67y9oq9pA2hhdXRoRGF0YVjESZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2NBAAAAAAAAAAAAAAAAAAAAAAAAAAAAQFDMjO9QameRvjVpw9ZN0bUekcv80DyxIf57VN8zjv93bq/NHh8QzqiUr3PNxZw3M0U3b+oVQmfOirsp68+Tiq+lAQIDJiABIVggy/NJCW5QMqfxRdvjCT6PeJMC/enM2b/83KeuHJAwENAiWCCLLEUZifuehFbVabqd/Cni7GvAEZikU3J6Q0+b+CXnqg==',
              clientDataJSON: 'eyJjaGFsbGVuZ2UiOiJORGxqT1RjeFltWXdZVFExWm1Ka1pUa3pOek13Tm1SalpUazNZVFl6TURjM01HSmtZamMzWW1FellqWm1OemcwWkRJMU5HWTJPR0UwTm1Sa05EQmhNZyIsImNsaWVudEV4dGVuc2lvbnMiOnt9LCJoYXNoQWxnb3JpdGhtIjoiU0hBLTI1NiIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsInR5cGUiOiJ3ZWJhdXRobi5jcmVhdGUifQ=='
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
