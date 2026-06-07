import { useEffect, useMemo, useState } from 'react'
import type { Position, PositionCoordinates } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import { resolveObstacleHeightMetrics } from '../domain/obstacleHeightInput'
import type { ObstacleHeightReference } from '../domain/obstacleHeightInput.types'
import type { ObstaclesFeasibilityEvaluationInput } from '../domain/obstaclesFeasibility.types'
import {
  POSITION_FIELD_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import CoordinateInput from './base/CoordinateInput'
import FireFeasibilityObstacleHeightField from './FireFeasibilityObstacleHeightField'
import type { FireFeasibilityObstacleHeightFieldChange } from './FireFeasibilityObstacleHeightField'
import FireFeasibilityRangeField from './FireFeasibilityRangeField'
import FormField from './FormField'
import Input from './Input'
import PositionLoadButton from './PositionLoadButton'
import TargetLoadButton from './TargetLoadButton'

interface FireFeasibilityCoordsFieldsProps {
  positionId?: string
  targetId?: string
  position?: Position
  target?: Target
  rangeDisplay: string
  onLinksChange: (links: EntityLinksUpdate) => void
  onObstacleChange: (value: ObstaclesFeasibilityEvaluationInput | null) => void
}

function parseOptionalNumber(value: string): number | null {
  if (value === '') {
    return null
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

function FireFeasibilityCoordsFields({
  positionId,
  targetId,
  position,
  target,
  rangeDisplay,
  onLinksChange,
  onObstacleChange,
}: FireFeasibilityCoordsFieldsProps) {
  const [obstacleHeight, setObstacleHeight] = useState<{
    rawHeightMeters: number | null
    reference: ObstacleHeightReference
  }>({ rawHeightMeters: null, reference: 'amsl' })
  const [positionToObstacleRangeInput, setPositionToObstacleRangeInput] = useState('')
  const [hide1Coordinates, setHide1Coordinates] = useState<PositionCoordinates | undefined>()
  const [hide1Height, setHide1Height] = useState('')
  const [hide2Coordinates, setHide2Coordinates] = useState<PositionCoordinates | undefined>()
  const [hide2Height, setHide2Height] = useState('')

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

      <FormField label='נ"צ עמדה' infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <CoordinateInput value={position?.coordinates} onChange={() => {}} disabled />
      </FormField>

      <FormField label="גובה עמדה" infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input
          type="number"
          value={position?.altitude != null ? String(position.altitude) : ''}
          disabled
        />
      </FormField>

      <FormField
        label="שם מטרה"
        infoTooltipText={TARGET_FIELD_TOOLTIP}
        headerAction={
          <TargetLoadButton
            targetId={targetId}
            onSelect={(selected) => onLinksChange({ targetId: selected.id })}
            onClear={() => onLinksChange({ targetId: null })}
          />
        }
      >
        <Input type="text" value={target?.targetName ?? ''} disabled />
      </FormField>

      <FormField label='נ"צ מטרה' infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <CoordinateInput value={target?.coordinates} onChange={() => {}} disabled />
      </FormField>

      <FormField label="גובה מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input
          type="number"
          value={target?.altitude != null ? String(target.altitude) : ''}
          disabled
        />
      </FormField>

      <FireFeasibilityRangeField rangeDisplay={rangeDisplay} />

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

      <FormField label='נ"צ הסתר 1'>
        <CoordinateInput value={hide1Coordinates} onChange={setHide1Coordinates} />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input
          type="number"
          value={hide1Height}
          onChange={(e) => setHide1Height(e.target.value)}
        />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <CoordinateInput value={hide2Coordinates} onChange={setHide2Coordinates} />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input
          type="number"
          value={hide2Height}
          onChange={(e) => setHide2Height(e.target.value)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityCoordsFields
