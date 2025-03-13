/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
*****/

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

    // this error might apply to fields other than amount
    it('receives a malformed syntax error callback from switch when PISP sends amount value 5.ABC which does not match regex pattern. code 3100.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError3100MalformedSyntax
      await axios.post(thirdpartyRequestsURI, payload, config)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '3100',
                  errorDescription: 'should match pattern "^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$"',
                  extensionList: [
                    { key: 'keyword', value: 'pattern' },
                    { key: 'dataPath', value: '.requestBody.amount.amount' },
                    { key: 'pattern', value: '^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$' }
                  ]
                })
            })
          )
        })
    })

    // this error should apply for all mandatory fields like transactionRequestId/payer/payee/etc
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it('receives a missing mandatory element error callback when PISP sends missing payer element from payload. tentative code 3100.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError3100MissingPayer
      await axios.post(thirdpartyRequestsURI, payload, config)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '3100',
                  errorDescription: 'should have required property \'payer\''
                })
            })
          )
        })
    })

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
      const payload = mockData.thirdpartyRequestsTransactionError6105InefficientFunds
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
              errorCode: '6105'
            })
        })
      )
    })

    it('receives a thirdparty request rejection error callback if downstream quote fails. tentative code 6105.', async () => {
      const thirdpartyRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
      const payload = mockData.thirdpartyRequestsTransactionError6105QuoteFail
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
              errorCode: '6105'
            })
        })
      )
    })
  })

  describe('3. PISP PUT /authorizations/{ID} response', (): void => {
    // todo: investigate why TTK is not using thirdparty-pisp spec definition of authorizations

    // would be unlikely that a fsp not be identified this late in the process but it could still happen?
    it('receives a destination fsp not found error callback from switch when DFSP is not found as a participant. code 3201.', async () => {
      // todo: investigate why TTK is not using thirdparty-pisp spec definition of authorizations
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/37b9a3b6-dbf8-4099-957e-c0219394e3e8`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'nonexistent-dfsp',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '3201'
                })
            })
          )
        })
    })

    // this error should apply for all mandatory fields like authenticationInfo/response type
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it('receives a missing mandatory element error callback from switch when PISP sends missing authenticationInfo element from payload. tentative code 3100.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/37b9a3b6-dbf8-4099-957e-c0219394e3e8`
      const payload = mockData.authorizationsPutPayloadMissingElement
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '3100',
                  errorDescription: 'should have required property \'responseType\''
                })
            })
          )
        })
    })

    it('receives a mismatched thirdparty ID error callback if dfsp errors on checking that /authorization/{UUID} pispId does not match associated /thirdpartyRequest/transaction/{UUID}. tentative code 6205', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/f4a0e590-7cee-4e98-a48a-b7a22d23ff12`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6205'
                })
            })
          )
        })
    })

    // tentative errors for bubbling up downstream errors
    it('receives a invalid signed challenge error callback if dfsp tries to validate signed challenge with auth service and it is not valid. tentative code 6200.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/e4283875-d152-4681-aae3-691365c60deb`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6200'
                })
            })
          )
        })
    })

    it('receives a thirdparty request rejection error callback if sourceAccountId is no longer valid. tentative code 6105.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/58a715c8-7c9c-46d5-8705-ba57093e77a9`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6105'
                })
            })
          )
        })
    })

    it('receives a thirdparty request rejection error callback if source account has insufficient funds for transfer. tentative code 6105.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/3dc003a0-5e49-4271-99ac-598053ed4488`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6105'
                })
            })
          )
        })
    })
    it('receives a thirdparty request rejection error callback if source account has insufficient funds for transfer. tentative code 6105.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/3dc003a0-5e49-4271-99ac-598053ed4488`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6105'
                })
            })
          )
        })
    })

    it('receives a maximum authorization retires reached error callback if authorization counter has passed the set limit. tentative code 6201.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/7c4b1be2-dff2-441d-9d94-6aa2c1a5169f`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6201'
                })
            })
          )
        })
    })

    it('receives a generic third party error callback if downstream transfer fails. tentative code 6000.', async () => {
      const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/d35943eb-b7a0-49f5-8d61-23cf6806d552`
      const payload = mockData.authorizationsPutPayload
      const headers = {
        headers: {
          'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
          'FSPIOP-Source': 'pispA',
          'FSPIOP-Destination': 'dfspA',
          date: new Date().toUTCString()
        }
      }
      await axios.put(authorizationsURI, payload, headers)
        .catch((error) => {
          // Assert
          expect(error.response.status).toBe(400)
          expect(error.response.data).toEqual(
            expect.objectContaining({
              errorInformation:
                expect.objectContaining({
                  errorCode: '6000'
                })
            })
          )
        })
    })
  })
})