import { useEffect, useState } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
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
import FireFeasibilityFormSharedTail from './FireFeasibilityFormSharedTail'

interface FireFeasibilityFormProps {
  mode: FireFeasibilityMode
  position: Position
  target: Target
  onUpdateData: (data: FireFeasibilityFormData) => void
}

function FireFeasibilityForm({
  mode,
  position,
  target,
  onUpdateData,
}: FireFeasibilityFormProps) {
  const metrics = useFireFeasibilityPositionTargetMetrics(position, target)
  const rangeDisplay = metrics?.range != null ? formatMetric(metrics.range) : ''
  const [flightPath, setFlightPath] = useState<FireFeasibilityFlightPath>('flat')
  const [obstacle, setObstacle] = useState<ObstaclesFeasibilityEvaluationInput | null>(null)

  useEffect(() => {
    onUpdateData({
      positionToTargetRange: metrics?.range ?? null,
      positionToTargetHeightDifference: metrics?.altitudeDiff ?? null,
      targetAltitudeMeters: target.altitude ?? null,
      flightPath,
      obstacle,
    })
  }, [metrics?.range, metrics?.altitudeDiff, target.altitude, flightPath, obstacle, onUpdateData])

  return (
    <div className="flex flex-col gap-4">
      {mode === 'coords' ? (
        <FireFeasibilityCoordsFields
          position={position}
          target={target}
          rangeDisplay={rangeDisplay}
          onObstacleChange={setObstacle}
        />
      ) : (
        <FireFeasibilityDistancesHeightsFields
          position={position}
          target={target}
          rangeDisplay={rangeDisplay}
          onObstacleChange={setObstacle}
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
