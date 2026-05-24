import { buildTargetInputFromPointerTeamUpdatedVars } from '../domain/target'
import type { NadbarMessageUserVars } from '../domain/nadbar.types'
import { addTargetUseCase } from './addTarget'

export function createTargetFromPointerTeamUpdatedVarsUseCase(vars: NadbarMessageUserVars): void {
  const input = buildTargetInputFromPointerTeamUpdatedVars(vars)
  addTargetUseCase(input)
}
