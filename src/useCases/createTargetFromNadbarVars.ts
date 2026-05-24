import { buildTargetInputFromNadbarMessageVars } from '../domain/nadbarTargetFromVars'
import type { NadbarMessageUserVars } from '../domain/nadbar.types'
import { addTargetUseCase } from './addTarget'

export function createTargetFromNadbarVarsUseCase(vars: NadbarMessageUserVars): void {
  const input = buildTargetInputFromNadbarMessageVars(vars)
  addTargetUseCase(input)
}
