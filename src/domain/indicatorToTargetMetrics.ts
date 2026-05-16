import { calculateTargetLiveMetrics } from './targetLiveMetrics'
import type { IndicatorToTargetMetricsInput } from './indicatorToTargetMetrics.types'
import type { IndicatorToTargetMetrics } from './indicatorToTargetMetrics.types'
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

export function calculateIndicatorToTargetMetrics(
  input: IndicatorToTargetMetricsInput
): IndicatorToTargetMetrics | null {
  if (!input.targetId || !input.indicatorId) {
    return null
  }

  if (!hasCoordinates(input.indicatorCoordinates) || !hasCoordinates(input.targetCoordinates)) {
    return null
  }

  const indicatorHeight = parseOptionalNumber(input.indicatorAltitude)
  const targetHeight = parseOptionalNumber(input.targetAltitude)
  if (indicatorHeight === undefined || targetHeight === undefined) {
    return null
  }

  return calculateTargetLiveMetrics({
    sourceEast: input.indicatorCoordinates.east,
    sourceNorth: input.indicatorCoordinates.north,
    sourceHeight: indicatorHeight,
    targetCoordinates: input.targetCoordinates,
    targetHeight,
  })
}
