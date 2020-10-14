
import { GlobalConfig } from '../config';
import Requests from '../requests';
import { SeedStep } from '../types';
import { wrapWithRunResult } from '../utils';
import { ConstConfig, GenericSteps } from './genericSteps';


// Step Constant config
// This won't change dynamically
const constConfig: ConstConfig =  {
  id: 'hubsteps',
  name: 'Hub Steps',
  description: 'Sets up the hub accounts',
  ignoreFailure: true,
}

// Define steps here
const stepGenerator = (config: GlobalConfig): Array<SeedStep> => {

  return [
    {
      name: 'setup `HUB_MULTILATERAL_SETTLEMENT` account',
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postHubAccount(config.urls.centralLedger, {
        body: {
          type: "HUB_MULTILATERAL_SETTLEMENT",
          currency: config.currency
        }
      }))
    },
    {
      name: 'setup `HUB_RECONCILIATION` account',
      ignoreFailure: true,
      command: wrapWithRunResult(() => Requests.postHubAccount(config.urls.centralLedger, {
        body: {
          type: "HUB_RECONCILIATION",
          currency: config.currency
        }
      }))
    },
    {
      name: 'setup `SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postHubEndpoints(config.urls.centralLedger, {
        body: {
          type: "SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL",
          value: 'email@example.com'
        }
      }))
    },
    {
      name: 'setup `NET_DEBIT_CAP_ADJUSTMENT_EMAIL`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postHubEndpoints(config.urls.centralLedger, {
        body: {
          type: "NET_DEBIT_CAP_ADJUSTMENT_EMAIL",
          value: 'email@example.com'
        }
      }))
    },
    {
      name: 'setup `NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL`',
      ignoreFailure: false,
      command: wrapWithRunResult(() => Requests.postHubEndpoints(config.urls.centralLedger, {
        body: {
          type: "NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL",
          value: 'email@example.com'
        }
      }))
    }
  ]
}

const hubsteps = (config: any) => new GenericSteps(constConfig, config, stepGenerator)

export default hubsteps
