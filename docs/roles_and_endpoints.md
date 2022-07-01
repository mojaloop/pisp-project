# Mojaloop/PISP Roles

A summary of Mojaloop FSPIOP API Endpoints and Roles as they stand today.

## Roles

- DFSP
  - fund-holding participant
  - has clearing and settlement functions
  - allows PISPs to initiate transfers on behalf of their users

- PISP
  - non-fund holding participant (and therefore no clearing or settlements as well)
  - initiates transfers on user's behalf
  - assumes delegated permissions _from_ user

## API Calls:

Information about API calls can be found here https://github.com/mojaloop/documentation/blob/master/website/versioned_docs/v1.0.1/api/thirdparty/data-models.md#ThirdPartyAPISpecification
