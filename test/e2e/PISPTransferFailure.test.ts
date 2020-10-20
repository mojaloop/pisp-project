/**
 * @name PISPTransferFailure
 * @description PISP End To End Tests
 */

describe('PISP initiated transfer failure', (): void => {
  describe('1. PISP GET /parties response', (): void => {
    // sent by the switch when a peer fsp can't be reached
    // unsure where these error codes are used
    it.todo('receives a communication error callback. code 1000.')
    it.todo('receives a destination communication error callback. code 1001.')

    // believe a PISP would need to know about these errors
    it.todo('receives a generic id not found error callback from switch when DFSP is not able to find party related to identifier. code 3200.')
    it.todo('receives a destination fsp not found error callback from switch when DFSP is not found as a participant. code 3201.')
    it.todo('receives a party not found error callback from switch when DFSP is not able to find party related to identifier, type and sub id/type. code 3204.')
  })

  describe('2. PISP POST /thirdpartyRequests/transactions response', (): void => {
    // believe for /thirdpartyRequests/transactions the idea is that a PISP
    // only needs to know if a thirdpartyRequest failed or succeeded.
    it.todo('receives a generic third party error callback. tentative code 6000.')
    it.todo('receives a generic third party request failed error callback. tentative code 6001.')

    // standard validation errors
    it.todo('receives a generic validation error callback. tentative code 6200.')

    // this error might apply to fields other than amount
    it.todo('receives a malformed syntax error callback from switch when PISP sends amount value 5.ABC which does not match regex pattern. tentative code 6201.')

    // this error should apply for all mandatory fields like transactionRequestId/payer/payee/etc
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it.todo('receives a missing mandatory element error callback when PISP sends missing payer element from payload. tentative code 6202.')

    it.todo('receives a consent not valid error callback when PISP sends incorrect or not existent consentId. tentative code 6103.')

    // tentative errors for bubbling up downstream errors
    it.todo('receives a thirdparty request rejection error callback if source account has insufficient funds for transfer. tentative code 6105.')
    it.todo('receives a thirdparty request rejection error callback if downstream quote fails. tentative code 6105.')
  })

  describe('3. PISP PUT /authorizations/{ID} response', (): void => {
    // would be unlikely that a fsp not be identified this late in the process but it could still happen?
    it.todo('receives a destination fsp not found error callback from switch when DFSP is not found as a participant. code 3201.')

    // this error should apply for all mandatory fields like authenticationInfo/response type
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it.todo('receives a missing mandatory element error callback from switch when PISP sends missing authenticationInfo element from payload. tentative code 6202.')

    it.todo('receives a mismatched thirdparty ID error callback if dfsp errors on checking that /authorization/{UUID} pispId does not match associated /thirdpartyRequest/transaction/{UUID}. tentative code 6209')

    // tentative errors for bubbling up downstream errors
    it.todo('receives a invalid signed challenge error callback if dfsp tries to validate signed challenge with auth service and it is not valid. tentative code 6204.')
    it.todo('receives a thirdparty request rejection error callback if sourceAccountId is no longer valid. tentative code 6105.')
    it.todo('receives a thirdparty request rejection error callback if source account has insufficient funds for transfer. tentative code 6105.')
    it.todo('receives a maximum authorization retires reached error callback if authorization counter has passed the set limit. tentative code 6205.')
    it.todo('receives a generic third party error callback if downstream transfer fails. tentative code 6000.')
  })
})
