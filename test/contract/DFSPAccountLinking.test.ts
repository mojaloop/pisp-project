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

 - Lewis Daly <lewisd@crosslaketech.com>
 --------------
 ******/


import TestEnv from '../e2e/TestEnv'
import axios from 'axios'

const baseRequestConfig = {
  headers: {
    'Content-Type': 'application/vnd.interoperability.thirdparty+json;version=1.0',
    Accept: 'application/vnd.interoperability.thirdparty+json;version=1.0',
    'FSPIOP-Source': 'dfspA',
    'FSPIOP-Destination': 'pispA',
    Date: new Date().toUTCString()
  }
}


jest.setTimeout(10 * 1000) // 10 seconds

describe('DFSP side account linking contract tests', () => {
  it('Calls `PUT /consentRequests/{id}` with the WEB auth channel', async () => {
    // Arrange
    const consentRequestId = '4cab6274-8b3e-41b4-83ce-fc0847409155'
    const consentRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/consentRequests/${consentRequestId}`
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
    }

    const result = await axios.put(consentRequestsURI, data, baseRequestConfig)
    // Assert
    expect(result.status).toBe(202)
  })

  // TODO: this is brokenish... TTK can't filter based on array contents
  it.skip('Calls `PUT /consentRequests/{id}` with the OTP auth channel', async () => {
    // Arrange
    const consentRequestId = '4cab6274-8b3e-41b4-83ce-fc0847409155'
    const consentRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/consentRequests/${consentRequestId}`
    const data = {
      initiatorId: 'pispA',
      authChannels: ['OTP'],
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
      authUri: 'OTPHEY',
    }

    const result = await axios.put(consentRequestsURI, data, baseRequestConfig)
    // Assert
    expect(result.status).toBe(202)
  })

  // DFSP calls `POST /consents`, then recieves `PUT /consents` after Auth-Service approves credential
  it('Calls `POST /consents`', async () => {
    // Arrange
    const consentId = '8e34f91d-d078-4077-8263-2c047876fcf6'
    const consentRequestId = '4cab6274-8b3e-41b4-83ce-fc0847409155'
    const consentURI = `${TestEnv.baseUrls.mlTestingToolkit}/consents`
    const data = {
      id: consentId,
      requestId: consentRequestId,
      initiatorId: 'pispA',
      participantId: 'dfspa',
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
    }

    // Act
    const result = await axios.post(consentURI, data, baseRequestConfig)

    // Assert
    expect(result.status).toBe(202)

    // TODO: check longpolling?
  })

  // Auth-Service or DFSP calls `PUT /consents/{id}` and adds empty credential
  // recevies callback from PISP - signed challenge
  it.only('Calls `PUT /consents/{id}` and gets the signed challenge from the PISP', async () => {
    // Arrange
    const consentId = '8e34f91d-d078-4077-8263-2c047876fcf6'
    const consentRequestId = '4cab6274-8b3e-41b4-83ce-fc0847409155'
    const consentURI = `${TestEnv.baseUrls.mlTestingToolkit}/consents/${consentId}`
    const data = {
      requestId: consentRequestId,
      initiatorId: 'pispA',
      participantId: 'dfspa',
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
      // credential in pending status
      credential: {
        type: 'FIDO',
        status: 'PENDING',
        challenge: {
          payload: 'random base 64 bytes'
        }
      }
    }

    // Act
    const result = await axios.put(consentURI, data, baseRequestConfig)

    // Assert
    expect(result.status).toBe(202)

    //TODO: check longpolling for signed challenge from PISP
  })

  // Auth-Service or DFSP calls `PUT /consents/{id}` with finalized
  // credential
  it.skip('Calls `PUT /consents/{id}` with the finalized consent.credential')
})
