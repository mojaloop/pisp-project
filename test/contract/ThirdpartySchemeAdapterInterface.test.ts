


// Tests out the 3p API interface running in the ttk

import axios from "axios"
import TestEnv from "../e2e/TestEnv"


describe('Thirdparty Scheme Adapter Interface', () => {
  describe('health', () => {
    it.todo('GET /health')
    it.todo('GET /metrics')
  })
  
  describe('authorizations', () => {
    it.todo('POST /authorizations')
  })

  describe('thirdpartyRequests', () => {
    it.todo('POST /thirdpartyTransaction/partyLookup')
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