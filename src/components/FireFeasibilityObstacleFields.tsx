import { useEffect, useMemo, useState } from 'react'
import type { Position } from '../domain/position.types'
import { resolveObstacleHeightMetrics } from '../domain/obstacleHeightInput'
import type { ObstacleHeightReference } from '../domain/obstacleHeightInput.types'
import type { ObstaclesFeasibilityEvaluationInput } from '../domain/obstaclesFeasibility.types'
import FireFeasibilityObstacleHeightField from './FireFeasibilityObstacleHeightField'
import type { FireFeasibilityObstacleHeightFieldChange } from './FireFeasibilityObstacleHeightField'
import FormField from './FormField'
import Input from './Input'

function parseOptionalNumber(value: string): number | null {
  if (value === '') return null
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

interface FireFeasibilityObstacleFieldsProps {
  position?: Position
  onObstacleChange: (obstacle: ObstaclesFeasibilityEvaluationInput | null) => void
  initialObstacle?: ObstaclesFeasibilityEvaluationInput | null
}

function FireFeasibilityObstacleFields({
  position,
  onObstacleChange,
  initialObstacle = null,
}: FireFeasibilityObstacleFieldsProps) {
  const [obstacleHeight, setObstacleHeight] = useState<{
    rawHeightMeters: number | null
    reference: ObstacleHeightReference
  }>(() =>
    initialObstacle
      ? {
          rawHeightMeters: initialObstacle.positionToObstacleHeightDifferenceMeters,
          reference: 'abovePosition',
        }
      : { rawHeightMeters: null, reference: 'amsl' },
  )
  const [positionToObstacleRangeInput, setPositionToObstacleRangeInput] = useState(
    initialObstacle ? String(initialObstacle.positionToObstacleRangeMeters) : '',
  )

  const obstacle = useMemo(() => {
    const positionToObstacleRangeMeters = parseOptionalNumber(positionToObstacleRangeInput)
    if (
      obstacleHeight.rawHeightMeters === null ||
      positionToObstacleRangeMeters === null ||
      position?.altitude == null
    ) {
      return null
    }

    const heightMetrics = resolveObstacleHeightMetrics({
      rawHeightMeters: obstacleHeight.rawHeightMeters,
      reference: obstacleHeight.reference,
      positionAltitudeMeters: position.altitude,
    })

    return { ...heightMetrics, positionToObstacleRangeMeters }
  }, [obstacleHeight, positionToObstacleRangeInput, position?.altitude])

  useEffect(() => {
    if (
      position?.altitude == null &&
      obstacleHeight.rawHeightMeters != null &&
      positionToObstacleRangeInput !== ''
    ) {
      return
    }
    onObstacleChange(obstacle)
  }, [obstacle, onObstacleChange, position?.altitude, obstacleHeight.rawHeightMeters, positionToObstacleRangeInput])

  return (
    <>
      <FireFeasibilityObstacleHeightField
        initialRawHeightMeters={obstacleHeight.rawHeightMeters}
        initialReference={obstacleHeight.reference}
        onChange={(value: FireFeasibilityObstacleHeightFieldChange) => setObstacleHeight(value)}
      />
      <FormField label="טווח מכשול עמדה">
        <Input
          type="number"
          value={positionToObstacleRangeInput}
          onChange={(e) => setPositionToObstacleRangeInput(e.target.value)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityObstacleFields
