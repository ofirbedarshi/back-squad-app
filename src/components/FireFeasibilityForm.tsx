import { useEffect } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { FireFeasibilityFormData, FireFeasibilityMode } from '../domain/fireFeasibility.types'
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
  const rangeDisplay = metrics?.range != null ? metrics.range.toFixed(1) : ''

  useEffect(() => {
    onUpdateData({
      positionToTargetRange: metrics?.range ?? null,
      positionToTargetHeightDifference: metrics?.altitudeDiff ?? null,
    })
  }, [metrics?.range, metrics?.altitudeDiff, onUpdateData])

  return (
    <div className="flex flex-col gap-4">
      {mode === 'coords' ? (
        <FireFeasibilityCoordsFields
          position={position}
          target={target}
          rangeDisplay={rangeDisplay}
        />
      ) : (
        <FireFeasibilityDistancesHeightsFields
          position={position}
          target={target}
          rangeDisplay={rangeDisplay}
        />
      )}

      <FireFeasibilityFormSharedTail />
    </div>
  )
}

export default FireFeasibilityForm
