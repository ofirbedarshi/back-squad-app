import { useEffect, useMemo, useState } from 'react'
import type { Position } from '../domain/position.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import { resolveObstacleHeightMetrics } from '../domain/obstacleHeightInput'
import type { ObstacleHeightReference } from '../domain/obstacleHeightInput.types'
import type { ObstaclesFeasibilityEvaluationInput } from '../domain/obstaclesFeasibility.types'
import { POSITION_FIELD_TOOLTIP } from '../domain/fireFeasibility.constants'
import FireFeasibilityObstacleHeightField from './FireFeasibilityObstacleHeightField'
import type { FireFeasibilityObstacleHeightFieldChange } from './FireFeasibilityObstacleHeightField'
import FormField from './FormField'
import Input from './Input'
import PositionLoadButton from './PositionLoadButton'

export interface FireFeasibilityDistancesHeightsMetrics {
  rangeMeters: number | null
  heightDifferenceMeters: number | null
}

interface FireFeasibilityDistancesHeightsFieldsProps {
  positionId?: string
  position?: Position
  onLinksChange: (links: EntityLinksUpdate) => void
  onObstacleChange: (value: ObstaclesFeasibilityEvaluationInput | null) => void
  onMetricsChange: (metrics: FireFeasibilityDistancesHeightsMetrics) => void
}

function parseOptionalNumber(value: string): number | null {
  if (value === '') {
    return null
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

function FireFeasibilityDistancesHeightsFields({
  positionId,
  position,
  onLinksChange,
  onObstacleChange,
  onMetricsChange,
}: FireFeasibilityDistancesHeightsFieldsProps) {
  const [rangeInput, setRangeInput] = useState('')
  const [heightDiffInput, setHeightDiffInput] = useState('')
  const [obstacleHeight, setObstacleHeight] = useState<{
    rawHeightMeters: number | null
    reference: ObstacleHeightReference
  }>({ rawHeightMeters: null, reference: 'amsl' })
  const [positionToObstacleRangeInput, setPositionToObstacleRangeInput] = useState('')
  const [hide1Distance, setHide1Distance] = useState('')
  const [hide1HeightDiff, setHide1HeightDiff] = useState('')
  const [hide2Distance, setHide2Distance] = useState('')
  const [hide2HeightDiff, setHide2HeightDiff] = useState('')

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

    return {
      ...heightMetrics,
      positionToObstacleRangeMeters,
    }
  }, [obstacleHeight, positionToObstacleRangeInput, position?.altitude])

  useEffect(() => {
    onObstacleChange(obstacle)
  }, [obstacle, onObstacleChange])

  useEffect(() => {
    onMetricsChange({
      rangeMeters: parseOptionalNumber(rangeInput),
      heightDifferenceMeters: parseOptionalNumber(heightDiffInput),
    })
  }, [rangeInput, heightDiffInput, onMetricsChange])

  return (
    <>
      <FormField
        label="שם עמדה"
        infoTooltipText={POSITION_FIELD_TOOLTIP}
        headerAction={
          <PositionLoadButton
            positionId={positionId}
            autoLoadCurrent={false}
            onSelect={(selected) => onLinksChange({ positionId: selected.id })}
            onClear={() => onLinksChange({ positionId: null })}
          />
        }
      >
        <Input type="text" value={position?.stationName ?? ''} disabled />
      </FormField>

      <FormField label="גובה עמדה" infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input
          type="number"
          value={position?.altitude != null ? String(position.altitude) : ''}
          disabled
        />
      </FormField>

      <FormField label="טווח עמדה-מטרה">
        <Input
          type="number"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה עמדה-מטרה">
        <Input
          type="number"
          value={heightDiffInput}
          onChange={(e) => setHeightDiffInput(e.target.value)}
        />
      </FormField>

      <FireFeasibilityObstacleHeightField
        onChange={(value: FireFeasibilityObstacleHeightFieldChange) => setObstacleHeight(value)}
      />

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
