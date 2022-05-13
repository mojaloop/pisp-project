import TestEnv from './TestEnv'
import axios from 'axios'

/**
 * @name P2PTransfer
 * @description This is more of a sanity check so we know our environment is up and running
 */
describe('Peer to Peer transfer', (): void => {
  it('Performs a P2P transfer from Alice -> Bob', async (): Promise<void> => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspa}/scenarios`
    const options = [
      {
        name: 'scenario1',
        operation: 'postTransfers',
        body: {
          from: {
            ...TestEnv.users.alice
          },
          to: {
            ...TestEnv.users.bob
          },
          amountType: TestEnv.amountType,
          currency: TestEnv.currency,
          amount: TestEnv.amount,
          transactionType: 'TRANSFER',
          note: 'Test p2p transfer',
          homeTransactionId: 'homeTxId123'
        }
      }
    ]
    const expected = {
      amount: TestEnv.amount,
      amountType: 'SEND',
      currency: TestEnv.currency,
      currentState: 'COMPLETED',
      direction: 'OUTBOUND',
      fulfil: expect.objectContaining({
        body: expect.objectContaining({
          transferState: 'COMMITTED'
        }),
        headers: expect.any(Object)
      }),
      from: expect.objectContaining({
        idType: 'MSISDN',
        idValue: TestEnv.users.alice.idValue
      }),
      getPartiesRequest: expect.any(Object),
      getPartiesResponse: expect.objectContaining({
        body: expect.any(Object),
        headers: expect.any(Object)
      }),
      homeTransactionId: 'homeTxId123',
      initiatedTimestamp: expect.any(String),
      note: 'Test p2p transfer',
      prepare: expect.any(Object),
      quoteRequest: expect.any(Object),
      quoteResponse: expect.objectContaining({
        body: expect.objectContaining({
          transferAmount: {
            amount: TestEnv.amount,
            currency: TestEnv.currency
          }
        }),
        headers: expect.any(Object)
      }),
      to: expect.objectContaining({
        idType: 'MSISDN',
        idValue: TestEnv.users.bob.idValue
      }),
      transactionType: 'TRANSFER',
      transferId: expect.any(String),
      quoteId: expect.any(String),
      quoteResponseSource: 'dfspb'
    }

    // Act
    const result = await axios.post(scenariosURI, options)

    // Assert
    expect(result.status).toBe(200)
    expect(result.data.scenario1.result).toEqual(expect.objectContaining(expected))
  })

  it('Performs a P2P transfer from Bob -> Alice', async (): Promise<void> => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspb}/scenarios`
    const options = [
      {
        name: 'scenario1',
        operation: 'postTransfers',
        body: {
          from: {
            ...TestEnv.users.bob
          },
          to: {
            ...TestEnv.users.alice
          },
          amountType: TestEnv.amountType,
          currency: TestEnv.currency,
          amount: TestEnv.amount,
          transactionType: 'TRANSFER',
          note: 'Test p2p transfer',
          homeTransactionId: 'homeTxId123'
        }
      }
    ]
    const expected = {
      amount: TestEnv.amount,
      amountType: 'SEND',
      currency: TestEnv.currency,
      currentState: 'COMPLETED',
      direction: 'OUTBOUND',
      from: expect.objectContaining({
        idType: 'MSISDN',
        idValue: TestEnv.users.bob.idValue
      }),
      fulfil: expect.objectContaining({
        body: expect.objectContaining({
          transferState: 'COMMITTED'
        }),
        headers: expect.any(Object)
      }),
      getPartiesRequest: expect.any(Object),
      getPartiesResponse: expect.objectContaining({
        body: expect.any(Object),
        headers: expect.any(Object)
      }),
      homeTransactionId: 'homeTxId123',
      initiatedTimestamp: expect.any(String),
      note: 'Test p2p transfer',
      prepare: expect.any(Object),
      quoteRequest: expect.any(Object),
      quoteResponse: expect.objectContaining({
        body: expect.objectContaining({
          transferAmount: {
            amount: TestEnv.amount,
            currency: TestEnv.currency
          }
        }),
        headers: expect.any(Object)
      }),
      to: expect.objectContaining({
        idType: 'MSISDN',
        idValue: TestEnv.users.alice.idValue
      }),
      transactionType: 'TRANSFER',
      transferId: expect.any(String),
      quoteId: expect.any(String),
      quoteResponseSource: 'dfspa'
    }

    // Act
    const result = await axios.post(scenariosURI, options)
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.scenario1.result).toEqual(expect.objectContaining(expected))
  })

  it('Rejects an E2E Transfer', async (): Promise<void> => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspa}/scenarios`
    const options = [
      {
        name: 'scenario1',
        operation: 'postTransfers',
        body: {
          from: {
            ...TestEnv.users.alice
          },
          to: {
            ...TestEnv.users.bob
          },
          amountType: TestEnv.amountType,
          currency: TestEnv.currency,
          amount: '5105', // Triggers a rejection
          transactionType: 'TRANSFER',
          note: 'Test p2p transfer',
          homeTransactionId: 'homeTxId123'
        }
      }
    ]

    const expected = {
      statusCode: '5105',
      transferState: expect.objectContaining({
        currentState: 'ERROR_OCCURRED',
        amountType: 'SEND',
        currency: 'USD',
        amount: '5105'
      })
    }

    // Act
    const result = await axios.post(scenariosURI, options)

    // Assert
    expect(result.status).toBe(200)
    expect(result.data.scenario1.result).toEqual(expect.objectContaining(expected))
  })
})
