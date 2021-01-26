import TestEnv from '../e2e/TestEnv'
import axios from 'axios'

const Headers = {
  'Content-Type': 'application/vnd.interoperability.participants+json;version=1.0',
  Accept: 'application/vnd.interoperability.participants+json;version=1.0',
  'FSPIOP-Source': 'dfspa',
  Date: new Date().toUTCString()
}

/**
 * @name ConsentOracle
 * @description Consent Oracle Tests
 */
describe('Consent Oracle Tests', () => {
  it('Test POST /participants/{Type}/{ID} request', async () => {
    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/def5b010-ba74-4f9a-95c1-d8de07d04c43`
    const options = {
      fspId: 'dfspa',
      headers: Headers
    }

    const result = await axios.post(participantsURI, options)
    console.log(result)

    // Assert
    expect(result.status).toBe(201)
  })
  it('Test GET /participants/{Type}/{ID} request', async () => {
    // create entry to be retrieved
    const postParticipantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/02e28448-3c05-4059-b5f7-d518d0a2d8ea`
    const postOptions = {
      fspId: 'dfspa',
      headers: Headers
    }
    await axios.post(postParticipantsURI, postOptions)

    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/466b59cc-d552-42ee-b985-d33671506dca`
    const options = {
      headers: Headers
    }
    const result = await axios.get(participantsURI, options)

    // Assert
    expect(result.status).toBe(200)
    expect(result.data).toEqual(
      expect.objectContaining({
        partyList: [
          expect.objectContaining({
            id: '60e66264-168b-4407-b75d-10955d27a989'
          })
        ]
      })
    )
  })

  it('Test PUT /participants/{Type}/{ID} request', async () => {
    // create entry to be updated
    const postParticipantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/06a8099a-28cb-4738-ae76-41a1e50e8bf4`
    const postOptions = {
      fspId: 'dfspa',
      headers: Headers
    }
    await axios.post(postParticipantsURI, postOptions)

    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/06a8099a-28cb-4738-ae76-41a1e50e8bf4`
    const options = {
      fspId: 'dfspb',
      headers: Headers
    }

    const result = await axios.put(participantsURI, options)

    // Assert
    expect(result.status).toBe(200)
  })

  it('Test PUT /participants/{Type}/{ID} request', async () => {
    // create entry to be deleted
    const postParticipantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/b16b4e58-b937-4c85-905c-5e929d4afc02`
    const postOptions = {
      fspId: 'dfspa',
      headers: Headers
    }
    await axios.post(postParticipantsURI, postOptions)

    const options = {
      headers: Headers
    }
    const participantsURI = `${TestEnv.baseUrls.consentOracle}/participants/CONSENT/b16b4e58-b937-4c85-905c-5e929d4afc02`
    const result = await axios.delete(participantsURI, options)

    // Assert
    expect(result.status).toBe(204)
  })
})
