import { loadFeature, defineFeature } from 'jest-cucumber'

import Template from '../../src/Template'
import path from 'path'

const featurePath = path.join(__dirname, '../features/template.scenario.feature')
const feature = loadFeature(featurePath)

defineFeature(feature, (test): void => {
  let A: number, B: number, C: number
  test('Adding two arguments', ({ given, when, then }): void => {
    given('Template and two arguments: A=1 and B=2', (): void => {
      A = 1
      B = 2
    })

    when('I add A and B', (): void => {
      C = Template.add(A, B)
    })

    then('The result should be C=3', (): void => {
      expect(C).toBe(3)
    })
  })

  test('Checking index module layout', ({ given, when, then }): void => {
    let index = {}
    let indexType = ''
    given('Index module', (): void => {
      index = require('../../src/index')
    })

    when('I have default imported Index type', (): void => {
      indexType = typeof index
    })

    then('The imported Index is type object', (): void => {
      expect(indexType).toEqual('object')
    })
  })
})
