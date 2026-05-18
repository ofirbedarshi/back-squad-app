import { calculateTargetLiveMetrics } from './targetLiveMetrics'
import type { PositionToTargetMetricsInput } from './positionToTargetMetrics.types'
import type { PositionToTargetMetrics } from './positionToTargetMetrics.types'
import type { PositionCoordinates } from './position.types'

function parseOptionalNumber(value: string | number | undefined): number | undefined {
  if (value === undefined || value === '') {
    return undefined
  }

  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

function hasCoordinates(coords: PositionCoordinates | undefined): coords is PositionCoordinates {
  return !!coords && coords.east !== '' && coords.north !== ''
}

export function calculatePositionToTargetMetrics(
  input: PositionToTargetMetricsInput,
): PositionToTargetMetrics | null {
  if (!input.targetId || !input.positionId) {
    return null
  }

  if (!hasCoordinates(input.positionCoordinates) || !hasCoordinates(input.targetCoordinates)) {
    return null
  }

  const positionHeight = parseOptionalNumber(input.positionAltitude)
  const targetHeight = parseOptionalNumber(input.targetAltitude)
  if (positionHeight === undefined || targetHeight === undefined) {
    return null
  }

  return calculateTargetLiveMetrics({
    sourceEast: input.positionCoordinates.east,
    sourceNorth: input.positionCoordinates.north,
    sourceHeight: positionHeight,
    targetCoordinates: input.targetCoordinates,
    targetHeight,
  })
}
