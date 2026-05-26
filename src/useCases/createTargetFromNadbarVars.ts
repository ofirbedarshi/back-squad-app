import { buildTargetInputFromNadbarMessageVars } from '../domain/nadbarTargetFromVars'
import type { NadbarMessageUserVars } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { addTargetUseCase } from './addTarget'

export function createTargetFromNadbarVarsUseCase(vars: NadbarMessageUserVars): Target {
  const input = buildTargetInputFromNadbarMessageVars(vars)
  return addTargetUseCase(input)
}
