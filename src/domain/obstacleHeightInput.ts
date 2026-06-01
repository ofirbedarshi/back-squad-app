import type {
  ObstacleHeightMetrics,
  ResolveObstacleHeightMetricsInput,
} from './obstacleHeightInput.types'

function assertFiniteMeters(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} לא תקין`)
  }
}

export function resolveObstacleHeightMetrics(
  input: ResolveObstacleHeightMetricsInput,
): ObstacleHeightMetrics {
  assertFiniteMeters(input.rawHeightMeters, 'גובה מכשול')
  assertFiniteMeters(input.positionAltitudeMeters, 'גובה עמדה')

  if (input.reference === 'amsl') {
    return {
      obstacleHeightMeters: input.rawHeightMeters,
      positionToObstacleHeightDifferenceMeters:
        input.rawHeightMeters - input.positionAltitudeMeters,
    }
  }

  return {
    obstacleHeightMeters: input.positionAltitudeMeters + input.rawHeightMeters,
    positionToObstacleHeightDifferenceMeters: input.rawHeightMeters,
  }
}
