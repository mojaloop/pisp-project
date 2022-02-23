import TestEnv from './TestEnv'
import axios from 'axios'

describe('GET /linking/accounts/{fspId}/{userId}', (): void => {
  const expectedResp = {
    accounts: [
      {
        accountNickname: 'dfspa.user.nickname1',
        id: 'dfspa.username.1234',
        currency: 'ZAR'
      },
      {
        accountNickname: 'dfspa.user.nickname2',
        id: 'dfspa.username.5678',
        currency: 'USD'
      }
    ],
    currentState: 'COMPLETED'
  }

  // TODO: reenable this test!
  it.skip('PISP requests DFSP to return user accounts for linking', async (): Promise<void> => {
    const scenariosURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/accounts/dfspa/username1234`
    const response = await axios.get(scenariosURI)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expectedResp)
  })

  it('PISP requests DFSP: Expect ID not found', async (): Promise<void> => {
    const scenariosURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/accounts/dfspa/test`
    const idNotFoundResp = {
      accounts: [],
      errorInformation: {
        errorCode: '3200',
        errorDescription: 'Generic ID not found'
      },
      currentState: 'COMPLETED'
    }

    await axios.get(scenariosURI)
      .catch(error => {
        // Assert
        expect(error.response.status).toBe(500)
        expect(error.response.data).toEqual(expect.objectContaining(idNotFoundResp))
      })
  })
})
