/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
 and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed
 on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 - Sridhar Voruganti <sridhar.voruganti@modusbox.com>
 --------------
 ******/
import TestEnv from '../e2e/TestEnv'
import axios from 'axios'

describe('PISP side account linking tests', () => {
  const config = {
    headers: {
      'Content-Type': 'application/vnd.interoperability.thirdparty+json;version=1.0',
      Accept: 'application/vnd.interoperability.thirdparty+json;version=1.0',
      'FSPIOP-Source': 'psipA',
      'FSPIOP-Destination': 'dfspA',
      Date: new Date().toUTCString()
    }
  }

  it('Test GET /parties/OPAQUE/{ID} & callback response', async () => {
    const partiesURI = `${TestEnv.baseUrls.mlTestingToolkit}/parties/OPAQUE/dfspa.alice.1234`
    const result = await axios.get(partiesURI, config)
    // Assert
    expect(result.status).toBe(202)

    const partiesCallbackURI =
      `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/parties/OPAQUE/dfspa.alice.1234`
    const response = await axios.get(partiesCallbackURI, config)
    const partiesCallbackResponse = (response.data.data) ? response.data.data : response.data.body
    const expected = {
      party: {
        partyIdInfo: {
          partyIdType: 'MSISDN',
          partyIdentifier: '+1-111-111-1111',
          fspId: 'dfspA'
        },
        merchantClassificationCode: '4321',
        name: 'Alice K',
        personalInfo: {
          complexName: {
            firstName: 'Alice',
            lastName: 'K'
          },
          dateOfBirth: '1963-06-16'
        },
        accounts: {
          account: [
            {
              address: 'dfspa.alice.1234',
              currency: 'USD',
              description: 'savings'
            },
            {
              address: 'dfspa.alice.5678',
              currency: 'USD',
              description: 'checking'
            }
          ]
        }
      }
    }
    // Assert
    expect(response.status).toBe(200)
    expect(partiesCallbackResponse).toEqual(expected)
  })

  it('Test POST /consentRequests & callback response', async () => {
    const consentRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/consentRequests`
    const data = {
      id: '4cab6274-8b3e-41b4-83ce-fc0847409155',
      initiatorId: 'pispA',
      authChannels: ['WEB', 'OTP'],
      scopes: [
        {
          accountId: 'dfspa.alice.1234',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        },
        {
          accountId: 'dfspa.alice.5678',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        }
      ],
      callbackUri: 'pisp-app://callback.com'
    }

    const result = await axios.post(consentRequestsURI, data, config)
    // Assert
    expect(result.status).toBe(202)

    const consentRequestsCallbackURI =
      `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/consentRequests/${data.id}`
    const response = await axios.get(consentRequestsCallbackURI, config)
    const consentRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body
    const expected = {
      initiatorId: 'pispA',
      authChannels: [
        'WEB'
      ],
      scopes: [
        {
          accountId: 'dfspa.alice.1234',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        },
        {
          accountId: 'dfspa.alice.5678',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        }
      ],
      callbackUri: 'pisp-app://callback.com',
      authUri: 'dfspa.com/authorize?consentRequestId=xxxxx'
    }

    // Assert
    expect(response.status).toBe(200)
    expect(consentRequestsCallbackResponse).toEqual(expected)
  })

  it('Test PUT /consentRequests/{ID}', async () => {
    const consentRequestsURI =
      `${TestEnv.baseUrls.mlTestingToolkit}/consentRequests/4cab6274-8b3e-41b4-83ce-fc0847409155`
    const data = {
      initiatorId: 'pispA',
      authChannels: ['WEB'],
      scopes: [
        {
          accountId: 'dfspa.alice.1234',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        },
        {
          accountId: 'dfspa.alice.5678',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        }
      ],
      callbackUri: 'pisp-app://callback.com',
      authUri: 'dfspa.com/authorize?consentRequestId=xxxxx',
      authToken: 'otp or secret'
    }

    const result = await axios.put(consentRequestsURI, data, config)
    // Assert
    expect(result.status).toBe(202)
  })

  it('Test POST /consents/{ID}/generateChallenge & callback response', async () => {
    const consentsURI =
      `${TestEnv.baseUrls.mlTestingToolkit}/consents/9d553d59-610f-44aa-b7ec-b483af24e98a/generateChallenge`
    const data = {
      type: 'FIDO'
    }

    const result = await axios.post(consentsURI, data, config)
    // Assert
    expect(result.status).toBe(202)

    const consentsURICallbackURI =
      `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/consents/9d553d59-610f-44aa-b7ec-b483af24e98a`
    const response = await axios.get(consentsURICallbackURI, config)
    const consentsCallbackResponse = (response.data.data) ? response.data.data : response.data.body
    const expected = {
      requestId: '4cab6274-8b3e-41b4-83ce-fc0847409155',
      participantId: 'dfspA',
      initiatorId: 'pispA',
      scopes: [
        {
          accountId: 'dfspa.alice.1234',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        },
        {
          accountId: 'dfspa.alice.5678',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        }
      ],
      credential: {
        type: 'FIDO',
        status: 'PENDING',
        challenge: {
          payload: 'base64 encoded challenge'
        }
      }
    }

    // Assert
    expect(response.status).toBe(200)
    expect(consentsCallbackResponse).toEqual(expected)
  })

  it('Test PUT /consents/{ID}', async () => {
    const consentsURI = `${TestEnv.baseUrls.mlTestingToolkit}/consents/9d553d59-610f-44aa-b7ec-b483af24e98a`
    const data = {
      requestId: '4cab6274-8b3e-41b4-83ce-fc0847409155',
      participantId: 'dfspA',
      initiatorId: 'pispA',
      scopes: [
        {
          accountId: 'dfspa.alice.1234',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        },
        {
          accountId: 'dfspa.alice.5678',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        }
      ],
      credential: {
        id: '9876',
        type: 'FIDO',
        status: 'PENDING',
        challenge: {
          payload: 'base64 encoded challenge',
          signature: 'payload signed by PISP - using private key'
        },
        payload: 'base64 encoded bytes- using public key'
      }
    }

    const result = await axios.put(consentsURI, data, config)
    // Assert
    expect(result.status).toBe(200)
  })
})
