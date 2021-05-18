import TestEnv from './TestEnv'
import axios from 'axios'

describe('GET /linking/providers', (): void => {
  const expectedResp = {
    accounts: ['dfspA', 'dfspB'],
    currentState: 'providersLookupSuccess'
  }

  it('PISP requests Thirdparty service enabled DFSPs', async (): Promise<void> => {
    const scenariosURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/providers`
    const response = await axios.get(scenariosURI)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expectedResp)
  })
})
