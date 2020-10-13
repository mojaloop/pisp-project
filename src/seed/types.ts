import { RunResult } from './runResult';

export interface SeedStep {
  name: string,
  ignoreFailure: boolean,
  command: () => Promise<RunResult>
}

export interface SeedCollection {
  id: string,
  name: string,
  description?: string,
  steps: Array<SeedStep>
  ignoreFailure: boolean
  run: () => Promise<RunResult>
}
