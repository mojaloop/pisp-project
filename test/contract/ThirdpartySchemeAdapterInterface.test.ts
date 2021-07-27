


// Tests out the 3p API interface running in the ttk


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
    it.todo(`GET /linking/accounts/{fspId}/{ userId }`)
    it.todo(`POST /linking/request-consent`)
    it.todo(`PATCH /linking/request-consent/{ID}/authenticate`)
    it.todo(`POST /linking/request-consent/{ID}/pass-credential`)
  })

})