
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
    dfspaThirdpartySchemeAdapterInbound: string;
    dfspaThirdpartySchemeAdapterOutbound: string;
    dfspbSchemeAdapter: string;
    dfspbThirdpartySchemeAdapterInbound: string;
    dfspbThirdpartySchemeAdapterOutbound: string;
    pispSchemeAdapter: string;
    pispThirdpartySchemeAdapterInbound: string;
    pispThirdpartySchemeAdapterOutbound: string;
    pispContractSchemeAdapter: string;
    mlTestingToolkit: string;
    mlTestingToolkitInbound: string;
  };
  currency: string;
  users: {
    [index: string]: UserIdType;
  };
  parties: {
    [index: string]: string;
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
    dfspaThirdpartySchemeAdapterInbound: 'http://localhost:5005',
    dfspaThirdpartySchemeAdapterOutbound: 'http://localhost:5006',
    dfspbSchemeAdapter: 'http://localhost:6002',
    dfspbThirdpartySchemeAdapterInbound: 'http://localhost:6005',
    dfspbThirdpartySchemeAdapterOutbound: 'http://localhost:6006',
    pispSchemeAdapter: 'http://localhost:7002',
    pispThirdpartySchemeAdapterInbound: 'http://localhost:7005',
    pispThirdpartySchemeAdapterOutbound: 'http://localhost:7006',
    pispContractSchemeAdapter: 'http://localhost:8002',
    mlTestingToolkit: 'http://localhost:15000',
    mlTestingToolkitInbound: 'http://localhost:5050'
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
  },
  parties: {
    pisp: 'pisp'
  }
}

export default TestEnv
