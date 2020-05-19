# Error Codes

This document is suggesting that a high level error category 6xxx(can be another number if 6xxx is reserved) be used to represent errors that are returned to a third party such as PISP’s and AISP’s. These are error codes the Switch would send back to a PISP.

- **Third Party Error** -- **60**_xx_

| **Error Code** | **Name** | **Description** | /parties | /thirdPartyRequest | /consentRequests | /authorizations |
| --- | --- | --- | --- | --- | --- | --- |
| **6000** | Third party error | Generic third party error. | X | X | X | X |
| **6001** | Third party request error | Third party request failed. | X | X | X | X |

- **Permission Error** -- **61**_xx_

| **Error Code** | **Name** | **Description** | /parties | /thirdPartyRequest | /consentRequests | /authorizations |
| --- | --- | --- | --- | --- | --- | --- |
| **6100** | Authentication rejection | Generic authentication rejection |  |  | X | X |
| **6101** | Unsupported authentication channel | Authentication request is attempting to authorize with an authentication channel that the DFSP does not support. Example Web, OTP. |  |  |  | X |
| **6102** | Unsupported scopes were requested | Authentication request is attempting to get authorization for scopes that the DFSP doesn’t allow/support |  | |  | X |
| **6103** | Consent not given | DFSP denies user gave consent or DFSP says user has revoked consent. |  |  | X |  |

- **Validation Error** -- **62**_xx_

| **Error Code** | **Name** | **Description** | /parties | /thirdPartyRequest | /consentRequests | /authorizations |
| --- | --- | --- | --- | --- | --- | --- |
| **6200** | Validation error | Generic validation error. | X | X | X | X |
| **6201** | Invalid signed challenge | PISP server receives signed challenge that does not match the original challenge. |  |  |  | X |
| **6202** | Missing authentication credential | Payload received with missing authentication credential.  |  |  |  | X |
| **6203** | Invalid authentication token | DFSP receives invalid authentication token from PISP.  |  |  |  | X |
| **6204** | OTP is incorrect | One time password is incorrect.  |  |  |  |X|
