import type { Target } from '../domain/target.types'

export function getTargetSearchFields(target: Target): string[] {
  return [
    target.targetName,
    target.coordinates.east,
    target.coordinates.north,
  ]
}
