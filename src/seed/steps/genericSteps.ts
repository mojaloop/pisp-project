import chalk from 'chalk';
import { GlobalConfig } from '../config';
import { Result, RunResult, RunResultType } from '../runResult';
import { SeedCollection, SeedStep } from '../types';
export interface ConstConfig {
  id: string,
  name: string,
  description?: string,
  ignoreFailure: boolean,
}

export class GenericSteps implements SeedCollection {
  id: string;
  name: string;
  description?: string;
  steps: SeedStep[];
  ignoreFailure: boolean;

  constructor(constConfig: ConstConfig, globalConfig: GlobalConfig, stepGenerator: (config: GlobalConfig) => Array<SeedStep>) {
    this.id = constConfig.id
    this.name = constConfig.name
    this.description = constConfig.description
    this.ignoreFailure = constConfig.ignoreFailure

    this.steps = stepGenerator(globalConfig)
  }

  public async run(): Promise<RunResult> {
    let warnings: Array<string> = []
    let errors: Array<Error> = []

    for (const step of this.steps) {
      console.log("  - step:", chalk.magenta(step.name))
      const result = await step.command()

      warnings = warnings.concat(result.warnings)
      if (result.type === RunResultType.FAILURE) {
        if (step.ignoreFailure) {
          // add to warnings - we are ignoring the failure
          warnings = warnings.concat(result.errors.map(e => `${step.name}: ${e.name}, ${e.message}`))
        } else {
          // only add errors if we aren't ignoring failures
          errors = errors.concat(result.errors)
        }
      }
    }

    if (errors.length > 0) {
      return Result.Failure(errors, warnings)
    }

    return Result.Success(warnings)
  }
}
