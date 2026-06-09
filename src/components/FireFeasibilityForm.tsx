import { useCallback, useEffect, useState } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type {
  FireFeasibilityFlightPath,
  FireFeasibilityFormData,
  FireFeasibilityMode,
} from '../domain/fireFeasibility.types'
import type { ObstaclesFeasibilityEvaluationInput } from '../domain/obstaclesFeasibility.types'
import FireFeasibilityConcealmentFields from './FireFeasibilityConcealmentFields'
import FireFeasibilityFormModeToggle from './FireFeasibilityFormModeToggle'
import FireFeasibilityFormSharedTail from './FireFeasibilityFormSharedTail'
import FireFeasibilityObstacleFields from './FireFeasibilityObstacleFields'
import FireFeasibilityPositionFields from './FireFeasibilityPositionFields'
import FireFeasibilityTargetCoordsSection from './FireFeasibilityTargetCoordsSection'
import type { FireFeasibilityTargetMetrics } from './FireFeasibilityTargetCoordsSection'
import FireFeasibilityTargetRangeSection from './FireFeasibilityTargetRangeSection'

interface FireFeasibilityFormProps {
  mode: FireFeasibilityMode
  onModeChange: (mode: FireFeasibilityMode) => void
  positionId?: string
  targetId?: string
  position?: Position
  target?: Target
  onPositionChange: (positionId: string | null) => void
  onTargetChange: (targetId: string | null) => void
  onUpdateData: (data: FireFeasibilityFormData) => void
}

function FireFeasibilityForm({
  mode,
  onModeChange,
  positionId,
  targetId,
  position,
  target,
  onPositionChange,
  onTargetChange,
  onUpdateData,
}: FireFeasibilityFormProps) {
  const [flightPath, setFlightPath] = useState<FireFeasibilityFlightPath>('flat')
  const [obstacle, setObstacle] = useState<ObstaclesFeasibilityEvaluationInput | null>(null)
  const [concealment, setConcealment] = useState<FireFeasibilityFormData['concealment']>(null)
  const [metrics, setMetrics] = useState<FireFeasibilityTargetMetrics>({
    rangeMeters: null,
    heightDifferenceMeters: null,
  })

  const handleMetricsChange = useCallback((next: FireFeasibilityTargetMetrics) => {
    setMetrics(next)
  }, [])

  useEffect(() => {
    const targetAltitudeMeters =
      position?.altitude != null && metrics.heightDifferenceMeters != null
        ? position.altitude + metrics.heightDifferenceMeters
        : null

    onUpdateData({
      positionToTargetRange: metrics.rangeMeters,
      positionToTargetHeightDifference: metrics.heightDifferenceMeters,
      targetAltitudeMeters,
      flightPath,
      obstacle,
      concealment,
    })
  }, [
    metrics.rangeMeters,
    metrics.heightDifferenceMeters,
    position?.altitude,
    flightPath,
    obstacle,
    concealment,
    onUpdateData,
  ])

  return (
    <div className="flex flex-col gap-4">
      <FireFeasibilityPositionFields
        positionId={positionId}
        position={position}
        onPositionChange={onPositionChange}
      />

      <FireFeasibilityFormModeToggle mode={mode} onModeChange={onModeChange} />

      {mode === 'coords' ? (
        <FireFeasibilityTargetCoordsSection
          position={position}
          targetId={targetId}
          target={target}
          onTargetChange={onTargetChange}
          onMetricsChange={handleMetricsChange}
        />
      ) : (
        <FireFeasibilityTargetRangeSection onMetricsChange={handleMetricsChange} />
      )}

      <FireFeasibilityObstacleFields position={position} onObstacleChange={setObstacle} />

      <FireFeasibilityConcealmentFields onConcealmentChange={setConcealment} />

      <FireFeasibilityFormSharedTail
        flightPath={flightPath}
        onFlightPathChange={setFlightPath}
      />
    </div>
  )
}

export default FireFeasibilityForm
