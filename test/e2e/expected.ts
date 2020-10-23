
export const Alice = {
  partyIdInfo: {
    partyIdType: 'MSISDN',
    partyIdentifier: '123456789',
    fspId: 'dfspa'
  },
  personalInfo: {
    complexName: { firstName: 'Alice', middleName: 'K', lastName: 'Alpaca' },
    dateOfBirth: '1970-01-01'
  },
  name: 'Alice Alpaca',
  accounts: {
    account: [
      {
        address: 'moja.amber.53451233-b82a5456a-4fa9-838b-123456789',
        currency: 'USD',
        description: 'savings'
      },
      {
        address: 'moja.amber.8f027046-b8236345a-4fa9-838b-123456789',
        currency: 'USD',
        description: 'checkings'
      }
    ]
  }
}

export const Bob = {
  partyIdInfo: {
    partyIdType: 'MSISDN',
    partyIdentifier: '987654321',
    fspId: 'dfspb'
  },
  personalInfo: {
    complexName: { firstName: 'Bob', middleName: 'O', lastName: 'Babirusa' },
    dateOfBirth: '1970-01-01'
  },
  name: 'Bob Babirusa',
  accounts: {
    account: [
      {
        address: 'moja.burgundy.76542756-f49gk439f-6a5f-543d-987654321',
        currency: 'USD',
        description: 'savings'
      },
      {
        address: 'moja.burgundy.43638980-f49gk439f-6a5f-543d-987654321',
        currency: 'USD',
        description: 'checkings'
      }
    ]
  }
}

export default {
  Alice,
  Bob
}
