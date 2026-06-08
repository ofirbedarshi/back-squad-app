import { useCallback, useEffect, useState } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import type {
  FireFeasibilityFlightPath,
  FireFeasibilityFormData,
  FireFeasibilityMode,
} from '../domain/fireFeasibility.types'
import type { ObstaclesFeasibilityEvaluationInput } from '../domain/obstaclesFeasibility.types'
import { formatMetric } from '../utils/metricRounding'
import { useFireFeasibilityPositionTargetMetrics } from '../hooks/useFireFeasibilityPositionTargetMetrics'
import FireFeasibilityCoordsFields from './FireFeasibilityCoordsFields'
import FireFeasibilityDistancesHeightsFields from './FireFeasibilityDistancesHeightsFields'
import type { FireFeasibilityDistancesHeightsMetrics } from './FireFeasibilityDistancesHeightsFields'
import FireFeasibilityFormSharedTail from './FireFeasibilityFormSharedTail'

interface FireFeasibilityFormProps {
  mode: FireFeasibilityMode
  positionId?: string
  targetId?: string
  position?: Position
  target?: Target
  onLinksChange: (links: EntityLinksUpdate) => void
  onUpdateData: (data: FireFeasibilityFormData) => void
}

function FireFeasibilityForm({
  mode,
  positionId,
  targetId,
  position,
  target,
  onLinksChange,
  onUpdateData,
}: FireFeasibilityFormProps) {
  const metrics = useFireFeasibilityPositionTargetMetrics(position, target)
  const rangeDisplay = metrics?.range != null ? formatMetric(metrics.range) : ''
  const [flightPath, setFlightPath] = useState<FireFeasibilityFlightPath>('flat')
  const [obstacle, setObstacle] = useState<ObstaclesFeasibilityEvaluationInput | null>(null)
  const [dhMetrics, setDhMetrics] = useState<FireFeasibilityDistancesHeightsMetrics>({
    rangeMeters: null,
    heightDifferenceMeters: null,
  })

  const handleDhMetricsChange = useCallback((next: FireFeasibilityDistancesHeightsMetrics) => {
    setDhMetrics(next)
  }, [])

  useEffect(() => {
    if (mode === 'distances-heights') {
      const targetAltitudeMeters =
        position?.altitude != null && dhMetrics.heightDifferenceMeters != null
          ? position.altitude + dhMetrics.heightDifferenceMeters
          : null

      onUpdateData({
        positionToTargetRange: dhMetrics.rangeMeters,
        positionToTargetHeightDifference: dhMetrics.heightDifferenceMeters,
        targetAltitudeMeters,
        flightPath,
        obstacle,
      })
    } else {
      onUpdateData({
        positionToTargetRange: metrics?.range ?? null,
        positionToTargetHeightDifference: metrics?.altitudeDiff ?? null,
        targetAltitudeMeters: target?.altitude ?? null,
        flightPath,
        obstacle,
      })
    }
  }, [
    mode,
    dhMetrics.rangeMeters,
    dhMetrics.heightDifferenceMeters,
    position?.altitude,
    metrics?.range,
    metrics?.altitudeDiff,
    target?.altitude,
    flightPath,
    obstacle,
    onUpdateData,
  ])

  return (
    <div className="flex flex-col gap-4">
      {mode === 'coords' ? (
        <FireFeasibilityCoordsFields
          positionId={positionId}
          targetId={targetId}
          position={position}
          target={target}
          rangeDisplay={rangeDisplay}
          onLinksChange={onLinksChange}
          onObstacleChange={setObstacle}
        />
      ) : (
        <FireFeasibilityDistancesHeightsFields
          positionId={positionId}
          position={position}
          onLinksChange={onLinksChange}
          onObstacleChange={setObstacle}
          onMetricsChange={handleDhMetricsChange}
        />
      )}

      <FireFeasibilityFormSharedTail
        flightPath={flightPath}
        onFlightPathChange={setFlightPath}
      />
    </div>
  )
}

export default FireFeasibilityForm
