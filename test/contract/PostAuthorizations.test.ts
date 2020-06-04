import TestEnv from '../e2e/TestEnv'
import axios from 'axios'

/**
 * @name PostAuthorizations
 * @description POST Authorizations Tests
 */
describe('POST Authorizations Tests', () => {
  it('Test post /authorizations request', async () => {
    const authorizationsURI = `${TestEnv.baseUrls.mlTestingToolkit}/authorizations`
    const options = {
      authenticationType: 'U2F',
      retriesLeft: '1',
      amount: {
        currency: 'USD',
        amount: '124.45'
      },
      transactionId: '2f169631-ef99-4cb1-96dc-91e8fc08f539',
      transactionRequestId: '02e28448-3c05-4059-b5f7-d518d0a2d8ea',
      quote: {
        transferAmount: {
          currency: 'USD',
          amount: '123.45'
        },
        payeeReceiveAmount: {
          currency: 'USD',
          amount: '123.45'
        },
        payeeFspFee: {
          currency: 'USD',
          amount: '1'
        },
        payeeFspCommission: {
          currency: 'USD',
          amount: '0'
        },
        expiration: '2020-05-17T15:28:54.250Z',
        geoCode: {
          latitude: '+45.4215',
          longitude: '+75.6972'
        },
        ilpPacket: 'YIBgQAAAAAAAASwNGxldmVsb25',
        condition: 'f5sqb7tBTWPd5Y8BDFdMm9BJR_MNI4isf8p8n4D5pHA',
        extensionList: {
          extension: [
            {
              key: 'extensionkey1',
              value: 'extensionvalue1'
            },
            {
              key: 'extensionkey2',
              value: 'extensionvalue2'
            }
          ]
        }
      }
    }
    const headers = {
      headers: {
        'Content-Type': 'application/vnd.interoperability.authorizations+json;version=1.0',
        Accept: 'application/vnd.interoperability.authorizations+json;version=1',
        'FSPIOP-Source': 'psip',
        Date: 'Wed, 03 Jun 2020 08:22:12 GMT'
      }
    }
    const result = await axios.post(authorizationsURI, options, headers)
    // Assert
    expect(result.status).toBe(202)
  })
})
