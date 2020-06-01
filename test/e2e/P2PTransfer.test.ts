import TestEnv from "./TestEnv"
import axios from 'axios'

/**
 * @name P2PTransfer
 * @description This is more of a sanity check so we know our environment is up and running 
 */
describe('Peer to Peer transfer', () => {
  it('Performs a P2P transfer from Alice -> Bob', async () => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspa}/scenarios`;
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
          note: "Test p2p transfer",
          homeTransactionId: "homeTxId123"
        }
      }
    ];
    const expected = {
      amount: TestEnv.amount,
      currentState: 'COMPLETED',
      fulfil: expect.objectContaining({
        transferState: 'COMMITTED',
      }),
      from: expect.objectContaining({
        idType: 'MSISDN',
        idValue: TestEnv.users.alice.idValue,
      }),
      to: expect.objectContaining({
        idType: "MSISDN",
        idValue: TestEnv.users.bob.idValue,
      }),
      quoteResponse: expect.objectContaining({
        transferAmount: {
          amount: TestEnv.amount,
          currency: TestEnv.currency,
        }
      })
    }
    
    // Act
    // TODO: use client library
    const result = await axios.post(scenariosURI, options)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.scenario1.result).toEqual(expect.objectContaining(expected));
  })

  it('Performs a P2P transfer from Bob -> Alice', async () => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspb}/scenarios`;
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
          note: "Test p2p transfer",
          homeTransactionId: "homeTxId123"
        }
      }
    ];
    const expected = {
      amount: TestEnv.amount,
      currentState: 'COMPLETED',
      fulfil: expect.objectContaining({
        transferState: 'COMMITTED',
      }),
      from: expect.objectContaining({
        idType: 'MSISDN',
        idValue: TestEnv.users.bob.idValue,
      }),
      to: expect.objectContaining({
        idType: "MSISDN",
        idValue: TestEnv.users.alice.idValue,
      }),
      quoteResponse: expect.objectContaining({
        transferAmount: {
          amount: TestEnv.amount,
          currency: TestEnv.currency,
        }
      })
    }
    
    // Act
    // TODO: use client library
    const result = await axios.post(scenariosURI, options)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.scenario1.result).toEqual(expect.objectContaining(expected));
  })

  it('Rejects an E2E Transfer', async () => {
    // Arrange
    const scenariosURI = `${TestEnv.baseUrls.dfspa}/scenarios`;
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
          amount: "5105", //Triggers a rejection
          transactionType: 'TRANSFER',
          note: "Test p2p transfer",
          homeTransactionId: "homeTxId123"
        }
      }
    ];
    const expected = {
      statusCode: '5105',
      transferState: expect.objectContaining({
        currentState: 'ERROR_OCCURRED',
        amountType: 'SEND',
        currency: 'USD',
        amount: '5105',
      }),
    }
    
    // Act
    // TODO: use client library
    const result = await axios.post(scenariosURI, options)
    
    // Assert
    expect(result.status).toBe(200)
    expect(result.data.scenario1.result).toEqual(expect.objectContaining(expected));
  })
})