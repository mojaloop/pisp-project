/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
*****/

import TestEnv from '../e2e/TestEnv'
import axios from 'axios'

/**
 * @name PISPTransfer
 * @description PISP transfer Tests
 * Outdated tests that were use to test POC of PISP initiated transfers.
 */

describe.skip('PISP initiated transfer', () => {
  let transactionRequestId: string | undefined

  // Note: these steps are wrapped in `describe` blocks to ensure they are run sequentially with Jest
  describe('1. PISP GET /parties & /transactionRequests', () => {
    it('initiates the transaction request', async () => {
      // Arrange
      const scenariosURI = `${TestEnv.baseUrls.pispContractSchemeAdapter}/requestToPay`
      const options = {
        homeTransactionId: 'test123',
        from: {
          ...TestEnv.users.bob
        },
        to: {
          ...TestEnv.users.alice
        },
        amountType: 'SEND',
        currency: TestEnv.currency,
        amount: '18',
        scenario: 'PAYMENT',
        initiator: 'PAYEE',
        initiatorType: 'BUSINESS',
        note: 'pisp payment'
      }

      const expected = {
        from: expect.objectContaining({
          ...TestEnv.users.bob,
          fspId: 'pisp-sim'
        }),
        to: expect.objectContaining({
          ...TestEnv.users.alice,
          fspId: 'pisp-sim'
        }),
        amountType: 'SEND',
        currency: 'USD',
        amount: '18',
        scenario: 'PAYMENT',
        initiator: 'PAYEE',
        initiatorType: 'BUSINESS',
        note: 'pisp payment',
        currentState: 'COMPLETED',
        requestToPayState: 'RECEIVED'
      }

      // Act
      // TODO: use client library
      const result = await axios.post(scenariosURI, options)
      transactionRequestId = result.data.transactionRequestId

      // Assert
      expect(result.status).toBe(200)
      expect(transactionRequestId).not.toBeUndefined()
      expect(result.data).toEqual(expect.objectContaining(expected))
    })
  })

  describe('2. PISP POST /quotes', () => {
    it('creates the quote', async () => {
      expect(transactionRequestId).not.toBeUndefined()

      // Arrange
      const scenariosURI = `${TestEnv.baseUrls.pispContractSchemeAdapter}/requestToPayTransfer`
      const options = {
        requestToPayTransactionId: transactionRequestId,
        from: {
          ...TestEnv.users.alice
        },
        to: {
          ...TestEnv.users.bob,
          fspId: 'dfspb'
        },
        amountType: 'SEND',
        currency: TestEnv.currency,
        amount: '18',
        scenario: 'PAYMENT',
        initiator: 'PAYEE',
        initiatorType: 'BUSINESS',
        note: 'test payment'
      }

      const expected = {
        requestToPayTransactionId: transactionRequestId,
        from: {
          ...TestEnv.users.alice
        },
        to: {
          ...TestEnv.users.bob,
          fspId: 'dfspb'
        },
        amountType: 'SEND',
        currency: 'USD',
        amount: '18',
        scenario: 'PAYMENT',
        initiator: 'PAYEE',
        initiatorType: 'BUSINESS',
        note: 'test payment',
        currentState: 'WAITING_FOR_QUOTE_ACCEPTANCE',
        quoteResponse: expect.objectContaining({
          transferAmount: {
            amount: '18',
            currency: TestEnv.currency
          }
        }),
        quoteResponseSource: 'pisp-sim'
      }

      // Act
      // TODO: use client library
      const result = await axios.post(scenariosURI, options)

      // Assert
      expect(result.status).toBe(200)
      expect(transactionRequestId).not.toBeUndefined()
      expect(result.data).toEqual(expect.objectContaining(expected))
    })
  })
})