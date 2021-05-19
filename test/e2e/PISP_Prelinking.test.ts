import TestEnv from './TestEnv'
import axios from 'axios'

describe('GET /linking/providers', (): void => {
  const expectedResp = {
    currentState: 'providersLookupSuccess',
    providers: ['dfspA', 'dfspB']
  }

  it('PISP requests Thirdparty service enabled DFSPs', async (): Promise<void> => {
    const scenariosURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/providers`
    const response = await axios.get(scenariosURI)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expectedResp)
  })

  // There's no arguments that can be used for conditions for rules to make the
  // ml-testing-toolkit return an error with the GET /services/{ServiceType} request
  it.todo('PISP requests Thirdparty service enabled DFSPs - error returned')
})
