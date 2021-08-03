


// Tests out the 3p API interface running in the ttk

import axios from 'axios'
import TestEnv from '../e2e/TestEnv'


describe('Thirdparty Scheme Adapter Interface', () => {
  describe('health', () => {

    // There seems to be a bug with the TTK for this one...
    it.todo('GET /health')
    it('GET /metrics', async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/metrics`
      const expected = 'string'

      // Act
      const result = await axios.get(tprURI, {})

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })
  })
  
  // Hmm what's the purpose of this endpoint? Maybe we can skip it for now
  // TODO: double check with Kevin...
  describe('authorizations', () => {
    it.skip('POST /authorizations', async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations`
      const body = {}
      const expected = 'string'

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })
  })

  describe('thirdpartyRequests', () => {
    const transactionRequestId = `b51ec534-ee48-4575-b6a9-ead2955b8069`
    it('POST /thirdpartyTransaction/partyLookup', async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyTransaction/partyLookup`
      const body = {
        transactionRequestId,
        payee: {
          partyIdType: 'MSISDN',
          partyIdentifier: '16135551212',
        },
      }
      const expected = {
        currentState: 'partyLookupSuccess', 
        party: { 
          name: 'Bob bobbington',
          partyIdInfo: {
            fspId: 'dfspb',
            partyIdType: 'MSISDN',
            partyIdentifier: '16135551212'
          }
        }
      }

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it('POST /thirdpartyTransaction/{ID}/initiate', async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyTransaction/${transactionRequestId}/initiate`
      const body = {
        payee: {
          name: 'Bob bobbington',
          partyIdInfo: {
            fspId: 'dfspb',
            partyIdType: 'MSISDN',
            partyIdentifier: '16135551212'
          }
        },
        payer: {
          partyIdType: 'THIRD_PARTY_LINK',
          partyIdentifier: '16135551212',
          fspId: 'dfspa', 
        },
        amountType: 'RECEIVE',
        amount: {
          currency: 'USD',
          amount: '123.47'
        },
        transactionType: {
          scenario: 'DEPOSIT',
          initiator: 'PAYER',
          initiatorType: 'CONSUMER',
        },
        expiration: '2021-05-24T08:38:08.699-04:00'
      }
      const expected = { 
        authorization: {
          amount: { 
            amount: '123.47',
            currency: 'USD' 
          }, 
          authenticationType: 'U2F', 
          quote: {
            condition: 'HOr22-H3AfTDHrSkPjJtVPRdKouuMkDXTR4ejlQa8Ks',
            expiration: '20212-01-01T00:00:00.000-04:00',
            ilpPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA',
            transferAmount: { 
              amount: '123.47',
              currency: 'USD' 
            } 
          }, 
          retriesLeft: '1', 
          transactionId: '8f6b2a9c-df32-4248-b115-799beada85ec',
          transactionRequestId
        }, 
        currentState: 'authorizationReceived' 
      }

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })


    it('POST /thirdpartyTransaction/{ID}/approve', async () => {
      // Arrange
      // Note: this body will change with: mojaloop/project#2275
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyTransaction/${transactionRequestId}/approve`
      const body = {
        authorizationResponse: {
          authenticationInfo: {
            authentication: 'U2F',
            // TODO: fill in with real authentication value - blocked by mojaloop/project#2275
            authenticationValue: {
              pinValue: 'xxxxxxxxxxx',
              counter: '1'
            }
          },
          responseType: 'ENTERED'
        }
      }
      const expected = {
        transactionStatus: {
          transactionId: '8f6b2a9c-df32-4248-b115-799beada85ec',
          transactionRequestState: 'ACCEPTED'
        },
        currentState: 'transactionStatusReceived'
      }

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })


    // TODO: I don't think this is needed...
    // TODO: double check with Kevin...
    it.todo('POST /thirdpartyRequests/transactions/{ID}/authorizations')
  })

  describe('linking', () => {
    const consentRequestIdOTP = 'f6ab43b0-71cc-49f9-b763-2ac3f05ac8c1'

    it(`GET /linking/providers`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/providers`
      const expected = { providers: ['dfspa', 'dfspb'], currentState: 'providersLookupSuccess' }

      // Act
      const result = await axios.get(tprURI, {})

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it(`GET /linking/accounts/{fspId}/{userId}`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/accounts/dfspa/username1234`
      const expected = [
        { 'accountNickname': 'dfspa.user.nickname1', 'currency': 'ZAR', 'id': 'dfspa.username.1234' },
        { 'accountNickname': 'dfspa.user.nickname2', 'currency': 'USD', 'id': 'dfspa.username.5678' }
      ]
     
      // Act
      const result = await axios.get(tprURI, {})

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it(`POST /linking/request-consent OTP`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/request-consent`
      const body = {
        consentRequestId: consentRequestIdOTP,
        toParticipantId: 'dfspa',
        accounts: [
          { accountNickname: 'SpeXXXXXXXXnt', id: 'dfspa.username.5678', currency: 'USD' }
        ],
        userId: 'username1234', 
        callbackUri: 'pisp-app://callback',
      }
      const expected = {
        channelResponse: {
          consentRequestId: consentRequestIdOTP,
          scopes: [
            {accountId: 'dfspa.username.5678', actions: [ 'accounts.transfer']}
          ], 
          authChannels: ['OTP'], 
          callbackUri: 'pisp-app://callback', 
        },
        currentState: 'OTPAuthenticationChannelResponseReceived'
      }

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it(`PATCH /linking/request-consent/{ID}/authenticate`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/request-consent/${consentRequestIdOTP}/authenticate`
      const body = {
        authToken: '123456'
      }
      const expected = {
        consent: {
          consentId: '76059a0a-684f-4002-a880-b01159afe119',
          consentRequestId: consentRequestIdOTP,
          scopes: [
            { accountId: 'dfspa.username.5678', actions: ['accounts.transfer'] }
          ],
        },
        challenge: 'c4adabb33e9306b038088132affcde556c50d82f603f47711a9510bf3beef6d6',
        currentState: 'consentReceivedAwaitingCredential'
      } 

      // Act
      const result = await axios.patch(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it(`POST /linking/request-consent/{ID}/pass-credential`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/request-consent/${consentRequestIdOTP}/pass-credential`
      const body = {
        // This is a valid FIDO credential
        credential: {
          credentialType: 'FIDO',
          status: 'PENDING',
          payload: {
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
        }
      }
      const expected = {
        credential: { 
          status: 'VERIFIED' 
        },
        currentState: 'accountsLinked'
      }

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })
  })
})