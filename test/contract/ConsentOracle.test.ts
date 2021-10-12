import TestEnv from '../e2e/TestEnv'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const baseRequestConfig = {
  headers: {
    'Content-Type': 'application/vnd.interoperability.thirdparty+json;version=1.0',
    Accept: 'application/vnd.interoperability.thirdparty+json;version=1.0',
    'FSPIOP-Source': 'dfspA',
    'FSPIOP-Destination': 'pispA',
    Date: new Date().toUTCString()
  }
}

jest.setTimeout(15 * 1000) // 15 seconds

describe('test', () => {
  it('Calls `POST /participants/{Type}/{ID}`', async () => {
    const consentId = uuidv4()
    const consentURI = `${TestEnv.baseUrls.mlTestingToolkit}/participants/CONSENT/${consentId}`
    const data = {
      fspId: 'dfspa'
    }

    const result = await axios.post(consentURI, data, baseRequestConfig)

    expect(result.status).toBe(202)

    // Check longpolling callback
    const consentsURICallbackURI = `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/participants/CONSENT/${consentId}`
    const response = await axios.get(consentsURICallbackURI, baseRequestConfig)

    expect(response.status).toBe(200)
  })

  it('Calls `DELETE /participants/{Type}/{ID}`', async () => {
    const consentId = uuidv4()
    const consentURI = `${TestEnv.baseUrls.mlTestingToolkit}/participants/CONSENT/${consentId}`
    const data = {
      fspId: 'dfspa'
    }

    // Create consent to be deleted
    await axios.post(consentURI, data, baseRequestConfig)

    const result = await axios.delete(consentURI, baseRequestConfig)

    expect(result.status).toBe(202)

    // Check longpolling callback
    const consentsURICallbackURI = `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/participants/CONSENT/${consentId}`
    const response = await axios.get(consentsURICallbackURI, baseRequestConfig)

    expect(response.status).toBe(200)
  })

  it('Calls `GET /participants/{Type}/{ID}`', async () => {
    const consentId = uuidv4()
    const consentURI = `${TestEnv.baseUrls.mlTestingToolkit}/participants/CONSENT/${consentId}`

    const result = await axios.get(consentURI, baseRequestConfig)

    expect(result.status).toBe(202)

    // Check longpolling callback
    const consentsURICallbackURI = `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/participants/CONSENT/${consentId}`
    const response = await axios.get(consentsURICallbackURI, baseRequestConfig)

    expect(response.status).toBe(200)
  })
})
