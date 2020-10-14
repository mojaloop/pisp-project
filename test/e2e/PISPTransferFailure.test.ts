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

    // sent by the switch when the switch is unable to fulfil a valid request
    // believe a PISP should know about these errors
    it.todo('receives a generic server error callback. code 2000.')
    it.todo('receives an internal server error callback. code 2001.')
    // sent if switch's ALS is down?
    it.todo('receives a service unavailable error callback.  code 2003.')
    it.todo('receives a server timed out error callback. code 2004.')
    // unsure how to test.
    it.todo('receives a server busy error callback. code 2005.')

    // unsure what triggers these error.
    it.todo('receives a generic client error callback. code 3000.')
    it.todo('receives an unacceptable version requested error callback. code 3001.')

    // don't believe these can occur from a GET parties scenario?
    it.todo('receives a generic validation error callback. code 3100.')
    it.todo('receives a malformed syntax error callback. code 3101.')
    it.todo('receives a missing mandatory syntax error callback. code 3102.')
    it.todo('receives a too large payload error callback from switch when PISP sends request with too large of payload. code 3104.')
    it.todo('receives an invalid signature error callback. code 3105.')

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
  })

  describe('3. PISP PUT /authorizations/{ID} response', (): void => {
    // would be unlikely that a fsp not be identified this late in the process but it could still happen?
    it.todo('receives a destination fsp not found error callback from switch when DFSP is not found as a participant. code 3201.')

    // this error should apply for all mandatory fields like authenticationInfo/response type
    // ideally when hapi openapi throws a missing required error it is reformated into a standard mojaloop error object
    it.todo('receives a missing mandatory element error callback from switch when PISP sends missing authenticationInfo element from payload. tentative code 6202.')

    it.todo('receives a  Mismatched thirdparty ID error callback if dfsp errors on checking that /authorization/{UUID} pispId does not match associated /thirdpartyRequest/transaction/{UUID}. tentative code 6208')
  })
})
