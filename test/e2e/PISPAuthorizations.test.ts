import TestEnv from './TestEnv'
import axios from 'axios'

/**
 * @name PISPAuthorizations
 * @description PISP End To End Authorization Test
 */

describe('PISP Authorizations flow', (): void => {
  it('DFSPB asks via scheme adapter the PISP to deliver Authorization from User', async (): Promise<void> => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspbThirdpartySchemeAdapterOutbound}/authorizations`
    const options = {
      toParticipantId: TestEnv.parties.pisp,
      authenticationType: 'U2F',
      retriesLeft: '1',
      amount: {
        currency: TestEnv.currency,
        amount: '100'
      },
      transactionId: 'c87e9f61-e0d1-4a1c-a992-002718daf402',
      transactionRequestId: 'aca279be-60c6-42ff-aab5-901d61b5e35c',
      quote: {
        transferAmount: {
          currency: TestEnv.currency,
          amount: '105'
        },
        expiration: '2020-07-15T09:48:54.961Z',
        ilpPacket: 'ilp-packet-value',
        condition: 'condition-000000000-111111111-222222222-abc'
      }
    }

    // Act
    const response = await axios.post(scenariosURI, options)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data.responseType).toEqual('ENTERED')

    // Assert authenticationInfo
    const authInfo = response.data.authenticationInfo
    const authValue = authInfo.authenticationValue
    expect(authInfo.authentication).toEqual(options.authenticationType)
    expect(authValue.pinValue).toBeDefined()
    expect(authValue.counter).toEqual(options.retriesLeft)

    // Assert state machine state
    expect(response.data.currentState).toEqual('COMPLETED')
  })
})
