
// Strict typing of run results
export enum RunResultType {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export type RunResult = SuccessResult | FailureResult
export interface SuccessResult {
  type: RunResultType.SUCCESS
  warnings: Array<string>
}

export interface FailureResult {
  type: RunResultType.FAILURE
  warnings: Array<string>
  errors: Array<Error>
}

export class Result {
  public static Success(warnings?: Array<string>): SuccessResult {
    return {
      type: RunResultType.SUCCESS,
      warnings: warnings || []
    }
  }

  public static Failure(errors: Array<Error>, warnings?: Array<string>): FailureResult {
    return {
      type: RunResultType.FAILURE,
      warnings: warnings || [],
      errors,
    }
  }
}
