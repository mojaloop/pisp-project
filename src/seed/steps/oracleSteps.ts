
import { GlobalConfig } from '../config';
import Requests from '../requests';
import { SeedStep } from '../types';
import { wrapWithRunResult } from '../utils';
import { ConstConfig, GenericSteps } from './genericSteps';


// Step Constant config
// This won't change dynamically
const constConfig: ConstConfig =  {
  id: 'oraclesteps',
  name: 'Oracle Steps',
  description: 'Seeds the initial oracle config',
  ignoreFailure: true,
}

// Define steps here
const stepGenerator = (config: GlobalConfig): Array<SeedStep> => {
  return [
    {
      name: 'create a default oracle',
      // This command is not idempotent
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postOracles(config.urls.alsAdmin, {
        body: {
          "oracleIdType": "MSISDN",
          "endpoint": {
            "value": `${config.applicationUrls.oracle}/oracle`,
            "endpointType": "URL"
          },
          "currency": "USD",
          "isDefault": true
        }
      }))
    },

  ]
}

const steps = (config: any) => new GenericSteps(constConfig, config, stepGenerator)
export default steps
