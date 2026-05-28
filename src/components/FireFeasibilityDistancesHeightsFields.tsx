import { useEffect, useMemo, useState } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { ObstaclesFeasibilityEvaluationInput } from '../domain/obstaclesFeasibility.types'
import {
  POSITION_FIELD_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import FireFeasibilityRangeField from './FireFeasibilityRangeField'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityDistancesHeightsFieldsProps {
  position: Position
  target: Target
  rangeDisplay: string
  onObstacleChange: (value: ObstaclesFeasibilityEvaluationInput | null) => void
}

function parseOptionalNumber(value: string): number | null {
  if (value === '') {
    return null
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

function FireFeasibilityDistancesHeightsFields({
  position,
  target,
  rangeDisplay,
  onObstacleChange,
}: FireFeasibilityDistancesHeightsFieldsProps) {
  const [obstacleHeightInput, setObstacleHeightInput] = useState('')
  const [positionToObstacleRangeInput, setPositionToObstacleRangeInput] = useState('')
  const [hide1Distance, setHide1Distance] = useState('')
  const [hide1HeightDiff, setHide1HeightDiff] = useState('')
  const [hide2Distance, setHide2Distance] = useState('')
  const [hide2HeightDiff, setHide2HeightDiff] = useState('')

  const obstacle = useMemo(() => {
    const obstacleHeightMeters = parseOptionalNumber(obstacleHeightInput)
    const positionToObstacleRangeMeters = parseOptionalNumber(positionToObstacleRangeInput)
    if (obstacleHeightMeters === null || positionToObstacleRangeMeters === null) {
      return null
    }

    return {
      obstacleHeightMeters,
      positionToObstacleRangeMeters,
      positionToObstacleHeightDifferenceMeters: obstacleHeightMeters - position.altitude,
    }
  }, [obstacleHeightInput, positionToObstacleRangeInput, position.altitude])

  useEffect(() => {
    onObstacleChange(obstacle)
  }, [obstacle, onObstacleChange])

  return (
    <>
      <FormField label="שם מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input type="text" value={target.targetName} disabled />
      </FormField>

      <FireFeasibilityRangeField rangeDisplay={rangeDisplay} />

      <FormField label="גובה מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input
          type="number"
          value={target.altitude != null ? String(target.altitude) : ''}
          disabled
        />
      </FormField>

      <FormField label="גובה עמדה" infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input type="number" value={String(position.altitude)} disabled />
      </FormField>

      <FormField label="גובה מכשול (מעל פני הים)">
        <Input
          type="number"
          value={obstacleHeightInput}
          onChange={(e) => setObstacleHeightInput(e.target.value)}
        />
      </FormField>

      <FormField label="טווח מכשול עמדה">
        <Input
          type="number"
          value={positionToObstacleRangeInput}
          onChange={(e) => setPositionToObstacleRangeInput(e.target.value)}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-1">
        <Input
          type="number"
          value={hide1Distance}
          onChange={(e) => setHide1Distance(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-1">
        <Input
          type="number"
          value={hide1HeightDiff}
          onChange={(e) => setHide1HeightDiff(e.target.value)}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-2">
        <Input
          type="number"
          value={hide2Distance}
          onChange={(e) => setHide2Distance(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-2">
        <Input
          type="number"
          value={hide2HeightDiff}
          onChange={(e) => setHide2HeightDiff(e.target.value)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityDistancesHeightsFields
