/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
*****/

import TestEnv from './TestEnv'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const options = {
  headers: {
    'Content-Type': 'application/vnd.interoperability.participants+json;version=1.0',
    Accept: 'application/vnd.interoperability.participants+json;version=1',
    'FSPIOP-Source': 'dfspa',
    Date: new Date().toUTCString()
  }
}

/**
 * @name ConsentOracle
 * @description Consent Oracle Tests
 * These are just some simple tests for now until mojaloop-simulator has participant
 * type scenarios so that we can test backend-> sdk-scheme-adapter -> als -> consent oracle.
 */
describe('Consent Oracle Tests', () => {
  it('Test POST /participants/{Type}/{ID} request', async () => {
    const uuid = uuidv4()
    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const payload = {
      fspId: 'dfspa'
    }

    const result = await axios.post(participantsURI, payload, options)

    // Assert
    expect(result.status).toBe(201)
  })

  it('Test GET /participants/{Type}/{ID} request', async () => {
    const uuid = uuidv4()
    // create entry to be retrieved
    const postParticipantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const postPayload = {
      fspId: 'dfspa'
    }
    await axios.post(postParticipantsURI, postPayload, options)

    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const result = await axios.get(participantsURI, options)

    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toEqual(
      expect.objectContaining({
        partyList: [
          expect.objectContaining({
            id: uuid
          })
        ]
      })
    )
  })

  it('Test PUT /participants/{Type}/{ID} request', async () => {
    const uuid = uuidv4()
    // create entry to be updated
    const postParticipantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const postPayload = {
      fspId: 'dfspa'

    }
    await axios.post(postParticipantsURI, postPayload, options)

    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const payload = {
      fspId: 'dfspb'

    }

    const result = await axios.put(participantsURI, payload, options)

    // Assert
    expect(result.status).toBe(200)
  })

  it('Test PUT /participants/{Type}/{ID} request', async () => {
    const uuid = uuidv4()
    // create entry to be deleted
    const postParticipantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const postPayload = {
      fspId: 'dfspa'

    }
    await axios.post(postParticipantsURI, postPayload, options)

    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/${uuid}`
    const result = await axios.delete(participantsURI, options)

    // Assert
    expect(result.status).toBe(204)
  })
})