
// TODO: load these more intelligently to allow for better configuration

export interface UserIdType {
  idType: 'MSISDN';
  idValue: string;
}

export interface TestEnvType {
  amount: string;
  amountType: string;
  baseUrls: {
    dfspa: string;
    dfspb: string;
    pisp: string;
    pispContract: string;
    dfspaSchemeAdapter: string;
    dfspbSchemeAdapter: string;
    pispSchemeAdapter: string;
    pispContractSchemeAdapter: string;
    mlTestingToolkit: string;
  };
  currency: string;
  users: {
    [index: string]: UserIdType;
  };
}

const TestEnv: TestEnvType = {
  amount: '100',
  amountType: 'SEND',
  baseUrls: {
    dfspa: 'http://localhost:9003',
    dfspb: 'http://localhost:10003',
    pisp: 'http://localhost:11003',
    pispContract: 'http://localhost:12003',
    dfspaSchemeAdapter: 'http://localhost:5002',
    dfspbSchemeAdapter: 'http://localhost:6002',
    pispSchemeAdapter: 'http://localhost:7002',
    pispContractSchemeAdapter: 'http://localhost:8002',
    mlTestingToolkit: 'http://localhost:15000'
  },
  currency: 'USD',
  users: {
    alice: {
      idType: 'MSISDN',
      idValue: '123456789'
    },
    bob: {
      idType: 'MSISDN',
      idValue: '987654321'
    }
  }
}

export default TestEnv
