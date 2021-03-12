import TestEnv from './TestEnv'
import axios from 'axios'

describe('GET /accounts/{ID}', (): void => {
  const requestConfig = {
    headers: {
      'FSPIOP-Source': 'pisp',
      'FSPIOP-Destination': 'dfspa',
      Date: new Date().toUTCString()
    }
  }
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

  it('PISP requests DFSP to return user accounts for linking', async (): Promise<void> => {
    const scenariosURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/accounts/username1234`
    const response = await axios.get(scenariosURI, requestConfig)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expectedResp)
  })

  it('PISP requests DFSP: Expect ID not found', async (): Promise<void> => {
    const scenariosURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/accounts/test`
    const idNotFoundResp = {
      accounts: [],
      errorInformation: {
        errorCode: '3200',
        errorDescription: 'Generic ID not found'
      },
      currentState: 'COMPLETED'
    }

    await axios.get(scenariosURI, requestConfig)
      .catch(error => {
        // Assert
        expect(error.response.status).toBe(500)
        expect(error.response.data).toEqual(expect.objectContaining(idNotFoundResp))
      })
  })
})
