import { useState } from 'react'
import {
  OBSTACLE_HEIGHT_FIELD_LABEL_BY_REFERENCE,
  OBSTACLE_HEIGHT_REFERENCE_TOGGLE_OPTIONS,
} from '../domain/fireFeasibility.constants'
import type { ObstacleHeightReference } from '../domain/obstacleHeightInput.types'
import FormField from './FormField'
import Input from './Input'
import SegmentedToggle from './base/SegmentedToggle'

export interface FireFeasibilityObstacleHeightFieldChange {
  rawHeightMeters: number | null
  reference: ObstacleHeightReference
}

interface FireFeasibilityObstacleHeightFieldProps {
  onChange: (value: FireFeasibilityObstacleHeightFieldChange) => void
}

function parseOptionalNumber(value: string): number | null {
  if (value === '') {
    return null
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

function FireFeasibilityObstacleHeightField({ onChange }: FireFeasibilityObstacleHeightFieldProps) {
  const [heightInput, setHeightInput] = useState('')
  const [reference, setReference] = useState<ObstacleHeightReference>('amsl')

  function emitChange(nextHeightInput: string, nextReference: ObstacleHeightReference): void {
    onChange({
      rawHeightMeters: parseOptionalNumber(nextHeightInput),
      reference: nextReference,
    })
  }

  function handleHeightInputChange(nextHeightInput: string): void {
    setHeightInput(nextHeightInput)
    emitChange(nextHeightInput, reference)
  }

  function handleReferenceChange(nextReference: string): void {
    const resolvedReference: ObstacleHeightReference =
      nextReference === 'abovePosition' ? 'abovePosition' : 'amsl'
    setReference(resolvedReference)
    emitChange(heightInput, resolvedReference)
  }

  return (
    <FormField label={OBSTACLE_HEIGHT_FIELD_LABEL_BY_REFERENCE[reference]}>
      <div className="flex flex-col gap-2">
        <SegmentedToggle
          size="compact"
          options={[...OBSTACLE_HEIGHT_REFERENCE_TOGGLE_OPTIONS]}
          value={reference}
          onChange={handleReferenceChange}
        />
        <Input
          type="number"
          value={heightInput}
          onChange={(event) => handleHeightInputChange(event.target.value)}
        />
      </div>
    </FormField>
  )
}

export default FireFeasibilityObstacleHeightField
