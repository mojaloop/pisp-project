/* eslint-disable import/no-named-as-default-member */
import TestEnv from './TestEnv'
import axios from 'axios'

// todo: rewrite tests once https://github.com/mojaloop/thirdparty-scheme-adapter/pull/102
//       is merged and new image is published
describe.skip('/consentRequests/{ID}/validate: start->OTPIsValid', (): void => {
  const consentRequestsId = 'c51ec534-ee48-4575-b6a9-ead2955b8069'

  it('state should be OTPIsValid on valid OTP', async (): Promise<void> => {
    // mojaloop-simulator is configured to return even authTokens as valid and
    // odd as invalid
    const validateRequest = {
      authToken: '123456'
    }
    const validateURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestsId}/authenticate`
    const validateResponse = await axios.patch(validateURI, validateRequest)
    expect(validateResponse.status).toEqual(200)
    expect(validateResponse.data.consent.consentRequestId).toEqual(consentRequestsId)
    // these scope values are mocked for now in mojaloop-simulator
    expect(validateResponse.data.consent.scopes).toEqual(
      [
        {
          accountId: 'dfsp.blue.account.one',
          actions: [
            'accounts.getBalance',
            'accounts.transfer'
          ]
        },
        {
          accountId: 'dfsp.blue.account.two',
          actions: [
            'accounts.getBalance',
            'accounts.transfer'
          ]
        }
      ]
    )
    expect(validateResponse.data.currentState).toEqual('OTPIsValid')
  })
})

// todo: rewrite tests once https://github.com/mojaloop/thirdparty-scheme-adapter/pull/102
//       is merged and new image is published
describe.skip('/consentRequests/{ID}/validate: start->errored', (): void => {
  const consentRequestsId = 'c51ec534-ee48-4575-b6a9-ead2955b8069'

  it('state should be errored on invalid OTP', async (): Promise<void> => {
    // mojaloop-simulator is configured to return even authTokens as valid and
    // odd as invalid
    const validateRequest = {
      authToken: '123457'
    }
    const validateURI = `${TestEnv.baseUrls.pispThirdpartySchemeAdapterOutbound}/linking/request-consent/${consentRequestsId}/authenticate`
    try {
      await axios.patch(validateURI, validateRequest)
    } catch (error) {
      expect(error.response.status).toEqual(500)
      expect(error.response.data.errorInformation).toEqual({
        errorCode: '7205',
        errorDescription: 'OTP failed validation'
      })
      expect(error.response.data.currentState).toEqual('errored')
    }
  })
})
