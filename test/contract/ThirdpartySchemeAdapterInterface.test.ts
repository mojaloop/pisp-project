


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
    it.only('POST /thirdpartyTransaction/partyLookup', async () => {
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
        "transactionRequestId": "b51ec534-ee48-4575-b6a9-ead2955b8069"
      }
      const expected = 'string'

      // Act
      const result = await axios.post(tprURI, body)

      // Assert
      expect(result.status).toBe(200)
      expect(result.data).toStrictEqual(expected)
    })

    it.todo('POST /thirdpartyTransaction/{ID}/initiate')
    it.todo('POST /thirdpartyTransaction/{ID}/approve')
    it.todo('POST /thirdpartyRequests/transactions/{ID}/authorizations')
  })

  describe('linking', () => {
    it.todo(`GET /linking/providers`)
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
    it.todo(`POST /linking/request-consent`)
    it.todo(`PATCH /linking/request-consent/{ID}/authenticate`)
    it.todo(`POST /linking/request-consent/{ID}/pass-credential`)
  })
})