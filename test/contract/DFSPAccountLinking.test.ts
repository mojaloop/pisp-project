/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")

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
*****/

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

  it('Calls `PUT /consentRequests/{id}` with the OTP auth channel', async () => {
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
      callbackUri: 'pisp-app://callback.com'
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

    // Check longpolling callback
    const consentsURICallbackURI = `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/consents/8e34f91d-d078-4077-8263-2c047876fcf6`
    const response = await axios.get(consentsURICallbackURI, baseRequestConfig)
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
        id: 'keyhandleId-123',
        type: 'FIDO',
        status: 'PENDING',
        challenge: {
          payload: 'base64 encoded challenge',
          signature: "base64 encoded signature",
        },
        payload: "base64 encoded public key",
      }
    }

    // Assert
    expect(response.status).toBe(200)
    expect(consentsCallbackResponse).toEqual(expected)
  })

  // Auth-Service or DFSP calls `PUT /consents/{id}` and adds empty credential
  // recevies callback from PISP containing the signed challenge
  it('Calls `PUT /consents/{id}` and gets the signed challenge from the PISP', async () => {
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

    // TODO: according to sequence diagrams, this should be 202 (since the credential is still PENDING)
    // but we currently don't have the ability to change the http response status based on the
    // request body
    expect(result.status).toBe(200)
  })

  // Auth-Service or DFSP calls `PUT /consents/{id}` with finalized credential
  it('Calls `PUT /consents/{id}` with the finalized consent.credential', async () => {
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
      // credential in verified status
      credential: {
        id: "9876",
        type: 'FIDO',
        status: 'VERIFIED',
        challenge: {
          payload: 'random base 64 bytes',
          signature: 'payload signed by PISP - using private key'
        },
        payload: 'base64 encoded bytes- using public key'
      }
    }

    // Act
    const result = await axios.put(consentURI, data, baseRequestConfig)

    // Assert
    expect(result.status).toBe(200)

    // Note: no more updates expected here - auth-service has the final say
  })
})
