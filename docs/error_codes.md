# Error Codes

This document is suggesting that a high level error category 6xxx(can be another number if 6xxx is reserved) be used to represent errors that are returned to a third party such as PISP’s and AISP’s. These are error codes the Switch would send back to a PISP.

- **Third Party Error** -- **60**_xx_

| **Error Code** | **Name** | **Description** | /parties | /thirdPartyRequest | /consentRequests | /authorizations | /consents |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **6000** | Third party error | Generic third party error. | X | X | X | X | X |
| **6001** | Third party request error | Third party request failed. | X | X | X | X | X |

- **Permission Error** -- **61**_xx_

| **Error Code** | **Name** | **Description** | /parties | /thirdPartyRequest | /consentRequests | /authorizations | /consents |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **6100** | Authentication rejection | Generic authentication rejection |  |  | X | X |  |
| **6101** | Unsupported authentication channel | Authentication request is attempting to authorize with an authentication channel that the DFSP does not support. Example Web, OTP. |  |  | X | X |  |
| **6102** | Unsupported scopes were requested | Authentication request is attempting to get authorization for scopes that the DFSP doesn’t allow/support |  |  | X | X |  |
| **6103** | Consent not given | DFSP denies user gave consent or DFSP says user has revoked consent. |  |  | X |  |  |
| **6104** | Consent not valid | DFSP denies user has valid consent with correct credentials. |  | X | X |  |  |
| **6105** | Thirdparty request rejection | DFSP catch all error used when it rejects a thirdparty request. |  | X | X | X | X |

- **Validation Error** -- **62**_xx_

| **Error Code** | **Name** | **Description** | /parties | /thirdPartyRequest | /consentRequests | /authorizations | /consents |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **6200** | Validation error | Generic validation error. | X | X | X | X | X |
| **6201** | Malformed syntax | Generic validation error. | X | X | X | X | X |
| **6202** | Missing mandatory element | The format of the parameter is not valid. For example, amount set to 5.ABC. The error description field should specify which element is erroneous | X | X | X | X | X |
| **6203** | Too many elements | The number of elements of an array exceeds the maximum number allowed. | X |  | X |  | X |
| **6204** | Invalid signed challenge | PISP server/DFSP receives signed challenge that is invalid. |  |  | X | X |  |
| **6205** | Maximum authorization retires reached | PISP server has reached maximum number of authorizations. |  |  | X | X |  |
| **6206** | Missing authentication credential | Payload received with missing authentication credential.  |  |  |  | X |  |  |
| **6207** | Invalid authentication token | DFSP receives invalid authentication token from PISP.  |  |  |  | X |  |
| **6208** | OTP is incorrect | One time password is incorrect.  |  |  |  | X |  |
| **6209** | Mismatched thirdparty ID | Thirdparty ID doesn't match corresponding thirdparty request.  |  |  |  | X |  |
