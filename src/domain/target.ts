import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { NadbarMessageUserVars } from './nadbar.types'
import { validatePositionCoordinates } from './positionCoordinates'
import type { Target, TargetInput } from './target.types'

const POINTER_TEAM_UPDATED_DEFAULT_PALACH = '36'

export function createTarget(input: TargetInput): Target {
  return createWithUpdatedAt(input)
}

export function applyTargetUpdate(existing: Target, input: TargetInput): Target {
  return applyWithUpdatedAt(existing, input)
}

export function validateTargetInput(input: TargetInput): void {
  if (!input.targetName.trim()) {
    throw new Error('שם מטרה: שדה חובה')
  }

  validatePositionCoordinates(input.coordinates)

  if (input.altitude === undefined || !Number.isFinite(input.altitude)) {
    throw new Error('גובה: שדה חובה')
  }
}

export function buildTargetInputFromPointerTeamUpdatedVars(vars: NadbarMessageUserVars): TargetInput {
  const targetName = vars.metara ?? ''
  const east = vars.meraom ?? ''
  const north = vars.tsepa ?? ''
  const gamalRaw = vars.gamal?.trim() ?? ''

  const input: TargetInput = {
    targetName,
    coordinates: {
      east,
      north,
      palach: POINTER_TEAM_UPDATED_DEFAULT_PALACH,
    },
    altitude: gamalRaw === '' ? undefined : Number(gamalRaw),
  }

  validateTargetInput(input)
  return input
}
