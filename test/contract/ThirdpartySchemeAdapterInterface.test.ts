


// Tests out the 3p API interface running in the ttk

import axios from "axios"
import TestEnv from "../e2e/TestEnv"


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
        "payee": {
          "partyIdType": "PERSONAL_ID",
            "partyIdentifier": "16135551212",
              "partySubIdOrType": "string",
                "fspId": "string",
                  "extensionList": {
            "extension": [
              {
                "key": "string",
                "value": "string"
              }
            ]
          }
        },
        transactionRequestId
      }
      const expected = 'string'

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
        "payee": {
          "partyIdInfo": {
            "partyIdType": "PERSONAL_ID",
            "partyIdentifier": "16135551212",
            "fspId": "dfspb",
          },
          "name": "Bob Bobbington",
          "personalInfo": {
            "complexName": {
              "firstName": "Bob",
              "middleName": "Johannes",
              "lastName": "Bobbington"
            },
            "dateOfBirth": "1966-06-16"
          }
        },
        "payer": {
          "partyIdType": "THIRD_PARTY_LINK",
          "partyIdentifier": "16135551212",
          "fspId": "dfspa", 
        },
        "amountType": "RECEIVE",
        "amount": {
          "currency": "AED",
          "amount": "123.45"
        },
        "transactionType": {
          "scenario": "DEPOSIT",
          "subScenario": "LOCALLY_DEFINED_SUBSCENARIO",
          "initiator": "PAYEE",
          "initiatorType": "CONSUMER",
          "refundInfo": {
            "originalTransactionId": "b51ec534-ee48-4575-b6a9-ead2955b8069",
            "refundReason": "Free text indicating reason for the refund."
          },
          "balanceOfPayments": "123"
        },
        "expiration": "2021-05-24T08:38:08.699-04:00"
      }
      const expected = 'string'

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it('POST /thirdpartyTransaction/{ID}/approve', async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyTransaction/${transactionRequestId}/approve`
      const body = {
        authorizationResponse: {
          authenticationInfo: {
            authentication: 'U2F',
            // TODO: fill in with real values...
            authenticationValue: {
              pinValue: 'xxxxxxxxxxx',
              counter: '1'
            }
          },
          responseType: 'ENTERED'
        }
      }
      const expected = 'string'

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })


    // TODO: I don't think this is needed...
    // TODO: double check with Kevin...
    it.skip('POST /thirdpartyRequests/transactions/{ID}/authorizations')
  })

  describe('linking', () => {
    it(`GET /linking/providers`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/providers`
      const expected = { providers: ["dfspa", "dfspb"], currentState: "providersLookupSuccess" }

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
        { "accountNickname": "dfspa.user.nickname1", "currency": "ZAR", "id": "dfspa.username.1234" },
        { "accountNickname": "dfspa.user.nickname2", "currency": "USD", "id": "dfspa.username.5678" }
      ]
     
      // Act
      const result = await axios.get(tprURI, {})

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it.only(`POST /linking/request-consent`, async () => {
      // Arrange
      const tprURI = `${TestEnv.baseUrls.mlTestingToolkit}/linking/request-consent`
      const body = {
        consentRequestId: 'f6ab43b0-71cc-49f9-b763-2ac3f05ac8c1',
        toParticipantId: 'dfspa',
        accounts: [
          { accountNickname: "XXXXXXnt", id: "dfspa.username.1234", currency: "ZAR" },
          { accountNickname: "SpeXXXXXXXXnt", id: "dfspa.username.5678", currency: "USD" }
        ],
        userId: "username1234", 
        callbackUri: 'pisp-app://callback',
      }
      const expected = {
        channelResponse: {
          consentRequestId: 'f6ab43b0-71cc-49f9-b763-2ac3f05ac8c1',
          scopes: [
            {accountId: 'dfspa.username.1234', actions: ['accounts.getBalance', 'accounts.transfer']}, 
            {accountId: 'dfspa.username.5678', actions: ['accounts.getBalance', 'accounts.transfer']}
          ], 
        authChannels: ["OTP"], 
        callbackURI: 'pisp-app://callback...', 
        authURI: 'dfspa.com/authorize?consentRequestId=6789'},
        currentState: "OTPAuthenticationChannelResponseReceived"
      }

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })


    it.todo(`PATCH /linking/request-consent/{ID}/authenticate`)
    it.todo(`POST /linking/request-consent/{ID}/pass-credential`)
  })
})