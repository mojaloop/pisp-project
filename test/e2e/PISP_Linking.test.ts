/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
*****/

/* eslint-disable import/no-named-as-default-member */
import TestEnv from './TestEnv'
import axios from 'axios'

const consentRequestsPostPartialData = {
  toParticipantId: 'dfspa',
  accounts: [
    { accountNickname: 'XXXXXXnt', address: 'dfspa.username.1234', currency: 'ZAR' },
    { accountNickname: 'SpeXXXXXXXXnt', address: 'dfspa.username.5678', currency: 'USD' }
  ],
  actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER'],
  userId: 'dfspa.username',
  callbackUri: 'pisp-app://callback.com',
  authChannels: [
    'WEB',
    'OTP'
  ]
}

const consentRequestsPutPartialData = {
  scopes: [
    {
      address: 'dfspa.username.1234',
      actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
    },
    {
      address: 'dfspa.username.5678',
      actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
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
  // Happy Path - Web uses a special `linkingRequestConsentPassCredentialBody.id`
  // which skips FIDO validation in the `auth-service`. This id is set in
  // `docker-local/docker/auth-service/default.json` under the
  // DEMO_SKIP_VALIDATION_FOR_CREDENTIAL_IDS config option
  describe('Happy Path - Web', (): void => {
    let consentId: string

    it('/linking/request-consent should be success', async (): Promise<void> => {
      // dfspa mojaloop-simulator returns WEB response for id 'b51ec534-ee48-4575-b6a9-ead2955b8069'
      const consentRequest = {
        ...consentRequestsPostPartialData,
        consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }
      const expectedResponse = {
        channelResponse: {
          ...consentRequestsPutPartialData,
          authChannels: ['WEB'],
          authUri: 'http://localhost:6060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069&callbackUri=http://localhost:42181/flutter-web-auth.html'
        },
        currentState: 'WebAuthenticationChannelResponseReceived'
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
            address: 'dfspa.username.1234',
            actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
          },
          {
            address: 'dfspa.username.5678',
            actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
          }
        ],
        status: 'ISSUED'
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

  /* IMPORTANT
    // Happy Path - OTP uses a request that will go through actual FIDO attestion.

    The fido challenges found in `Happy Path - OTP` are signed with
    Kevin Leyow's <kevin.leyow@modusbox.com> Yubikey. If the POST /consent
    `consentId` and `scopes` ever change form you will need to derive and resign the challenges,
    update the `credential` object and update this PSA.
    Take the console output of
    `console.log('Consent is:', JSON.stringify(consentRequestsResponse.data.consent))`
    and use https://github.com/mojaloop/contrib-fido-test-ui#creating-a-test-credential
    (You will need to run this at localhost or behind https, webbrowser crypto libraries only
     work behind secure contexts)
    to sign the request and update
    `Happy Path - OTP/linking/request-consent/consentRequestId/pass-credential should be success`
  */
  describe('Happy Path - OTP', (): void => {
    let consentId: string

    it('/linking/request-consent should be success', async (): Promise<void> => {
      // dfspa mojaloop-simulator returns OTP response for id 'c51ec534-ee48-4575-b6a9-ead2955b8069'
      const consentRequest = {
        ...consentRequestsPostPartialData,
        consentRequestId: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }

      const expectedResponse = {
        channelResponse: {
          ...consentRequestsPutPartialData,
          authChannels: ['OTP']
        },
        currentState: 'OTPAuthenticationChannelResponseReceived'
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
        consentRequestId: 'c51ec534-ee48-4575-b6a9-ead2955b8069',
        scopes: [
          {
            address: 'dfspa.username.1234',
            actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
          },
          {
            address: 'dfspa.username.5678',
            actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
          }
        ],
        status: 'ISSUED'
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
        // NOTE: Update this credential when consent If the POST /consent
        //       `consentId` and `scopes` ever change. Read `IMPORTANT` instructions above
        credential: {
          payload: {
            id: 'zMEeRCOGrJU53n-MWfZFtdQkkknJCLn_nIRD6TIO9uO4Mgd9WEefoII3ZBhfGiWQRYkqP_UAY4GxYiUT_0OZbA',
            rawId: 'zMEeRCOGrJU53n+MWfZFtdQkkknJCLn/nIRD6TIO9uO4Mgd9WEefoII3ZBhfGiWQRYkqP/UAY4GxYiUT/0OZbA==',
            response: {
              attestationObject: 'o2NmbXRoZmlkby11MmZnYXR0U3RtdKJjc2lnWEcwRQIgK5O/5iZlFuvThVhjj9DWRmImAk2fTJz3ecP1KyrDCKgCIQC1REKU+64f6o51HEAZxp2weSGMkmWte3kjcYKnFPOIy2N4NWOBWQLcMIIC2DCCAcCgAwIBAgIJALA5KjdfOKLrMA0GCSqGSIb3DQEBCwUAMC4xLDAqBgNVBAMTI1l1YmljbyBVMkYgUm9vdCBDQSBTZXJpYWwgNDU3MjAwNjMxMCAXDTE0MDgwMTAwMDAwMFoYDzIwNTAwOTA0MDAwMDAwWjBuMQswCQYDVQQGEwJTRTESMBAGA1UECgwJWXViaWNvIEFCMSIwIAYDVQQLDBlBdXRoZW50aWNhdG9yIEF0dGVzdGF0aW9uMScwJQYDVQQDDB5ZdWJpY28gVTJGIEVFIFNlcmlhbCA5MjU1MTQxNjAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATBUzDbxw7VyKPri/NcB5oy/eVWBkwkXfQNU1gLc+nLR5EP7xcV93l5aHDpq1wXjOuZA5jBJoWpb6nbhhWOI9nCo4GBMH8wEwYKKwYBBAGCxAoNAQQFBAMFBAMwIgYJKwYBBAGCxAoCBBUxLjMuNi4xLjQuMS40MTQ4Mi4xLjcwEwYLKwYBBAGC5RwCAQEEBAMCBDAwIQYLKwYBBAGC5RwBAQQEEgQQL8BXn4ETR+qxFrtajbkgKjAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQABaTFk5Jj2iKM7SQ+rIS9YLEj4xxyJlJ9fGOoidDllzj4z7UpdC2JQ+ucOBPY81JO6hJTwcEkIdwoQPRZO5ZAScmBDNuIizJxqiQct7vF4J6SJHwEexWpF4XztIHtWEmd8JbnlvMw1lMwx+UuD06l11LxkfhK/LN613S91FABcf/ViH6rqmSpHu+II26jWeYEltk0Wf7jvOtRFKkROFBl2WPc2Dg1eRRYOKSJMqQhQn2Bud83uPFxT1H5yT29MKtjy6DJyzP4/UQjhLmuy9NDt+tlbtvfrXbrIitVMRE6oRert0juvM8PPMb6tvVYQfiM2IaYLKChn5yFCywvR9Xa+aGF1dGhEYXRhWMRJlg3liA6MaHQ0Fw9kdmBbj+SuuaKGMseZXPO6gx2XY0EAAAAAAAAAAAAAAAAAAAAAAAAAAABAzMEeRCOGrJU53n+MWfZFtdQkkknJCLn/nIRD6TIO9uO4Mgd9WEefoII3ZBhfGiWQRYkqP/UAY4GxYiUT/0OZbKUBAgMmIAEhWCD0T3++oAlCdCKgtoxjMuuiXbHMCmKvDo5BkVZgwRHKASJYIG3A5XS9CQ4XmFK7n+vmYo862BR94WSKJ+DpmgVnXNzd',
              clientDataJSON: 'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiWldRMFpUQXdZelUwWVRVME5XRTBOVFU1TXprMU1qazNPRGs1WVRSbU1UQTVZbU5rWlRCaU9ETTVaVGcxTjJJd1l6VXdNakJqTWpaa1pHVTFZMkZpWWciLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJjcm9zc09yaWdpbiI6ZmFsc2UsIm90aGVyX2tleXNfY2FuX2JlX2FkZGVkX2hlcmUiOiJkbyBub3QgY29tcGFyZSBjbGllbnREYXRhSlNPTiBhZ2FpbnN0IGEgdGVtcGxhdGUuIFNlZSBodHRwczovL2dvby5nbC95YWJQZXgifQ=='
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
      // dfspA's thirdparty-sdk then sends a PUT /consents/{ID}/error
      // callback to the pisp containing that error.
      const linkingRequestConsentRequest = {
        ...consentRequestsPostPartialData,
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
        ...consentRequestsPostPartialData,
        consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }
      const expectedResponse = {
        channelResponse: {
          ...consentRequestsPutPartialData,
          authChannels: ['WEB'],
          authUri: 'http://localhost:6060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069&callbackUri=http://localhost:42181/flutter-web-auth.html'
        },
        currentState: 'WebAuthenticationChannelResponseReceived'
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
        ...consentRequestsPostPartialData,
        consentRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        toParticipantId: 'dfspa'
      }
      const expectedResponse = {
        channelResponse: {
          ...consentRequestsPutPartialData,
          authChannels: ['WEB'],
          authUri: 'http://localhost:6060/admin/dfsp/authorize?consentRequestId=b51ec534-ee48-4575-b6a9-ead2955b8069&callbackUri=http://localhost:42181/flutter-web-auth.html'
        },
        currentState: 'WebAuthenticationChannelResponseReceived'
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
            address: 'dfspa.username.1234',
            actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
          },
          {
            address: 'dfspa.username.5678',
            actions: ['ACCOUNTS_GET_BALANCE', 'ACCOUNTS_TRANSFER']
          }
        ],
        status: 'ISSUED'
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