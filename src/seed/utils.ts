/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
*****/

import { Result, RunResult } from './runResult'

/**
 * @function wrapWithRunResult
 * @description A simple wrapper around an anonymous function
 *  if the function throws an error, the wrapper will return a FailureResult
 * @param func
 */
export function wrapWithRunResult (func: () => any): () => Promise<RunResult> {
  return async () => {
    try {
      await func()
      return Result.Success()
    } catch (err) {
      return Result.Failure([err])
    }
  }
}