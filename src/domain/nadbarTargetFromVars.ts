import { validatePositionCoordinates } from './positionCoordinates'
import type { NadbarMessageUserVars } from './nadbar.types'
import type { TargetInput } from './target.types'

const NADBAR_TARGET_FROM_VARS_DEFAULT_PALACH = '36'

export function validateNadbarTargetFromVarsInput(input: TargetInput): void {
  if (!input.targetName.trim()) {
    throw new Error('שם מטרה: שדה חובה')
  }

  validatePositionCoordinates(input.coordinates)

  if (input.altitude === undefined || !Number.isFinite(input.altitude)) {
    throw new Error('גובה: שדה חובה')
  }
}

export function buildTargetInputFromNadbarMessageVars(vars: NadbarMessageUserVars): TargetInput {
  const targetName = vars.metara ?? ''
  const east = vars.meraom ?? ''
  const north = vars.tsepa ?? ''
  const gamalRaw = vars.gamal?.trim() ?? ''

  const input: TargetInput = {
    targetName,
    coordinates: {
      east,
      north,
      palach: NADBAR_TARGET_FROM_VARS_DEFAULT_PALACH,
    },
    altitude: gamalRaw === '' ? undefined : Number(gamalRaw),
  }

  validateNadbarTargetFromVarsInput(input)
  return input
}
