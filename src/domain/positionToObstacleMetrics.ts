import { calculateTargetLiveMetrics } from './targetLiveMetrics'
import type { PositionToObstacleMetricsInput } from './positionToObstacleMetrics.types'
import type { PositionToObstacleMetrics } from './positionToObstacleMetrics.types'
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

export function calculatePositionToObstacleMetrics(
  input: PositionToObstacleMetricsInput,
): PositionToObstacleMetrics | null {
  if (!hasCoordinates(input.positionCoordinates) || !hasCoordinates(input.obstacleCoordinates)) {
    return null
  }

  const positionHeight = parseOptionalNumber(input.positionAltitude)
  const obstacleHeight = parseOptionalNumber(input.obstacleAltitude)
  if (positionHeight === undefined || obstacleHeight === undefined) {
    return null
  }

  return calculateTargetLiveMetrics({
    sourceEast: input.positionCoordinates.east,
    sourceNorth: input.positionCoordinates.north,
    sourceHeight: positionHeight,
    targetCoordinates: input.obstacleCoordinates,
    targetHeight: obstacleHeight,
  })
}
