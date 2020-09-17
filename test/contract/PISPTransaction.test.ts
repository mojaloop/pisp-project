import TestEnv from '../e2e/TestEnv'
import axios from 'axios'
// Note: execute these tests after enabling TTK rules in rules_response/default_pisp_rules.json
describe('E2E PISP side transaction Tests', () => {
  it('Test post /thirdpartyRequests/transactions request', async () => {
    const transactionsURI = `${TestEnv.baseUrls.mlTestingToolkit}/thirdpartyRequests/transactions`
    const options = {
      transactionRequestId: '7d34f91d-d078-4077-8263-2c047876fcf6',
      sourceAccountId: 'dfspa.alice.1234',
      consentId: '8e34f91d-d078-4077-8263-2c047876fcf6',
      payee: {
        partyIdInfo: {
          partyIdType: 'MSISDN',
          partyIdentifier: '+4412345678',
          fspId: 'dfspb'
        }
      },
      payer: {
        personalInfo: {
          complexName: {
            firstName: 'Ayesha',
            lastName: 'Takia'
          }
        },
        partyIdInfo: {
          partyIdType: 'MSISDN',
          partyIdentifier: '+44 8765 4321',
          fspId: 'dfspa'
        }
      },
      amountType: 'SEND',
      amount: {
        amount: '100',
        currency: 'USD'
      },
      transactionType: {
        scenario: 'TRANSFER',
        initiator: 'PAYER',
        initiatorType: 'CONSUMER'
      },
      expiration: '2016-05-24T08:38:08.699-04:00'
    }
    const headers = {
      headers: {
        'Content-Type': 'application/vnd.interoperability.thirdparty+json;version=1.0',
        Accept: 'application/vnd.interoperability.thirdparty+json;version=1',
        'FSPIOP-Source': 'psip',
        'FSPIOP-Destination': 'dfspa',
        Date: 'Wed, 03 Jun 2020 08:22:12 GMT'
      }
    }
    const result = await axios.post(transactionsURI, options, headers)
    // Assert
    expect(result.status).toBe(202)
  })

  it('Test put /authorizations/{ID} request', async () => {
    const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations/7d34f91d-d078-4077-8263-2c047876fcf6`
    const options = {
      authenticationInfo: {
        authentication: 'OTP',
        authenticationValue: '80739'
      },
      responseType: 'ENTERED'
    }
    const headers = {
      headers: {
        'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
        Accept: 'application/vnd.interoperability.authorizations+json;version=1',
        'FSPIOP-Source': 'psip',
        'FSPIOP-Destination': 'dfspa',
        Date: 'Wed, 03 Jun 2020 08:22:12 GMT'
      }
    }
    const result = await axios.put(authorizationsURI, options, headers)
    // Assert
    expect(result.status).toBe(200)
  })
})
