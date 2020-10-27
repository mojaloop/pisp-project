import TestEnv from '../e2e/TestEnv'
import axios from 'axios'
import * as TestErrorData from './data/mockErrorData.json'

const mockData = JSON.parse(JSON.stringify(TestErrorData))
/**
 * @name PISPTransferFailure
 * @description PISP End To End Tests
 */
describe('PISP initiated transfer failure', (): void => {
  describe('1. PISP GET /parties response', (): void => {
    const config = {
      headers: {
        'Content-Type': 'application/vnd.interoperability.parties+json;version=1.0',
        Accept: 'application/vnd.interoperability.parties+json;version=1.0',
        'FSPIOP-Source': 'pispA',
        'FSPIOP-Destination': 'dfspA',
        date: new Date().toUTCString()
      }
    }

    it('receives a communication error callback. code 1000.', async () => {
      const partiesURI = `${TestEnv.baseUrls.mlTestingToolkit}/parties/ALIAS/ERROR1000`
      const result = await axios.get(partiesURI, config)
      // Assert
      expect(result.status).toBe(202)

      const partiesCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/parties/ALIAS/ERROR1000`
      const response = await axios.get(partiesCallbackURI, config)
      const partiesCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(partiesCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '1000'
            })
        })
      )
    })

    it('receives a destination communication error callback. code 1001.', async () => {
      const partiesURI = `${TestEnv.baseUrls.mlTestingToolkit}/parties/ALIAS/ERROR1001`
      const result = await axios.get(partiesURI, config)
      // Assert
      expect(result.status).toBe(202)

      const partiesCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/parties/ALIAS/ERROR1001`
      const response = await axios.get(partiesCallbackURI, config)
      const partiesCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(partiesCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '1001'
            })
        })
      )
    })

    it('receives a generic id not found error callback from switch when DFSP is not able to find party related to identifier. code 3200.', async () => {
      const partiesURI = `${TestEnv.baseUrls.mlTestingToolkit}/parties/ALIAS/ERROR3200`
      const result = await axios.get(partiesURI, config)
      // Assert
      expect(result.status).toBe(202)

      const partiesCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/parties/ALIAS/ERROR3200`
      const response = await axios.get(partiesCallbackURI, config)
      const partiesCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(partiesCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '3200'
            })
        })
      )
    })

    it('receives a destination fsp not found error callback from switch when DFSP is not found as a participant. code 3201.', async () => {
      const partiesURI = `${TestEnv.baseUrls.mlTestingToolkit}/parties/ALIAS/ERROR3201`
      const result = await axios.get(partiesURI, config)
      // Assert
      expect(result.status).toBe(202)

      const partiesCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/parties/ALIAS/ERROR3201`
      const response = await axios.get(partiesCallbackURI, config)
      const partiesCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(partiesCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '3201'
            })
        })
      )
    })

    it('receives a party not found error callback from switch when DFSP is not able to find party related to identifier, type and sub id/type. code 3204.', async () => {
      const partiesURI = `${TestEnv.baseUrls.mlTestingToolkit}/parties/ALIAS/ERROR3204`
      const result = await axios.get(partiesURI, config)
      // Assert
      expect(result.status).toBe(202)

      const partiesCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/parties/ALIAS/ERROR3204`
      const response = await axios.get(partiesCallbackURI, config)
      const partiesCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(partiesCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '3204'
            })
        })
      )
    })
  })

  describe('2. PISP POST /thirdpartyRequests/transactions response', (): void => {
    const config = {
      headers: {
        'Content-Type': 'application/vnd.interoperability.thirdparty+json;version=1.0',
        Accept: 'application/vnd.interoperability.thirdparty+json;version=1.0',
        'FSPIOP-Source': 'pispA',
        'FSPIOP-Destination': 'dfspA',
        date: new Date().toUTCString()
      }
    }
    // believe for /thirdpartyRequests/transactions the idea is that a PISP
    // only needs to know if a thirdpartyRequest failed or succeeded.
    it('receives a generic third party error callback. tentative code 6000.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError6000
      const result = await axios.post(thirdpartyRequestsURI, payload, config)
      // Assert
      expect(result.status).toBe(202)

      const thirdpartyRequestsCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/thirdpartyRequests/transactions/7d34f91d-d078-4077-8263-2c047876fcf6`
      const response = await axios.get(thirdpartyRequestsCallbackURI, config)
      const thirdpartyRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(thirdpartyRequestsCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '6000'
            })
        })
      )
    })

    it('receives a generic third party request failed error callback. tentative code 6001.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError6001
      const result = await axios.post(thirdpartyRequestsURI, payload, config)
      // Assert
      expect(result.status).toBe(202)

      const thirdpartyRequestsCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/thirdpartyRequests/transactions/7d34f91d-d078-4077-8263-2c047876fcf6`
      const response = await axios.get(thirdpartyRequestsCallbackURI, config)
      const thirdpartyRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(thirdpartyRequestsCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '6001'
            })
        })
      )
    })
    // does ml-testing-toolkit not send validation error responses on it's own?
    it.todo('receives a generic validation error callback. code 6200.')

    // this error might apply to fields other than amount
    it.todo('receives a malformed syntax error callback from switch when PISP sends amount value 5.ABC which does not match regex pattern. tentative code 6201.')

    // this error should apply for all mandatory fields like transactionRequestId/payer/payee/etc
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it.todo('receives a missing mandatory element error callback when PISP sends missing payer element from payload. tentative code 6202.')

    it('receives a consent not valid error callback when PISP sends incorrect or not existent consentId. tentative code 6103.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError6103
      const result = await axios.post(thirdpartyRequestsURI, payload, config)
      // Assert
      expect(result.status).toBe(202)

      const thirdpartyRequestsCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/thirdpartyRequests/transactions/7d34f91d-d078-4077-8263-2c047876fcf6`
      const response = await axios.get(thirdpartyRequestsCallbackURI, config)
      const thirdpartyRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(thirdpartyRequestsCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '6103'
            })
        })
      )
    })

    // tentative errors for bubbling up downstream errors
    it('receives a thirdparty request rejection error callback if source account has insufficient funds for transfer. tentative code 6105.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError6103
      const result = await axios.post(thirdpartyRequestsURI, payload, config)
      // Assert
      expect(result.status).toBe(202)

      const thirdpartyRequestsCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/thirdpartyRequests/transactions/7d34f91d-d078-4077-8263-2c047876fcf6`
      const response = await axios.get(thirdpartyRequestsCallbackURI, config)
      const thirdpartyRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(thirdpartyRequestsCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '6103'
            })
        })
      )
    })

    it('receives a thirdparty request rejection error callback if downstream quote fails. tentative code 6105.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError6103
      const result = await axios.post(thirdpartyRequestsURI, payload, config)
      // Assert
      expect(result.status).toBe(202)

      const thirdpartyRequestsCallbackURI =
        `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/thirdpartyRequests/transactions/7d34f91d-d078-4077-8263-2c047876fcf6`
      const response = await axios.get(thirdpartyRequestsCallbackURI, config)
      const thirdpartyRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body

      // Assert
      expect(response.status).toBe(200)
      expect(thirdpartyRequestsCallbackResponse).toEqual(
        expect.objectContaining({
          errorInformation:
            expect.objectContaining({
              errorCode: '6103'
            })
        })
      )
    })
  })

  describe('3. PISP PUT /authorizations/{ID} response', (): void => {
    // would be unlikely that a fsp not be identified this late in the process but it could still happen?
    it.todo('receives a destination fsp not found error callback from switch when DFSP is not found as a participant. code 3201.')

    // this error should apply for all mandatory fields like authenticationInfo/response type
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it.todo('receives a missing mandatory element error callback from switch when PISP sends missing authenticationInfo element from payload. tentative code 6202.')

    it.todo('receives a mismatched thirdparty ID error callback if dfsp errors on checking that /authorization/{UUID} pispId does not match associated /thirdpartyRequest/transaction/{UUID}. tentative code 6209')

    // tentative errors for bubbling up downstream errors
    it.todo('receives a invalid signed challenge error callback if dfsp tries to validate signed challenge with auth service and it is not valid. tentative code 6204.')
    it.todo('receives a thirdparty request rejection error callback if sourceAccountId is no longer valid. tentative code 6105.')
    it.todo('receives a thirdparty request rejection error callback if source account has insufficient funds for transfer. tentative code 6105.')
    it.todo('receives a maximum authorization retires reached error callback if authorization counter has passed the set limit. tentative code 6205.')
    it.todo('receives a generic third party error callback if downstream transfer fails. tentative code 6000.')
  })
})
