import { useEffect, useState } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import {
  FLIGHT_PATH_OPTIONS,
  POSITION_FIELD_TOOLTIP,
  RANGE_COMPUTED_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import { useFireFeasibilityPositionTargetMetrics } from '../hooks/useFireFeasibilityPositionTargetMetrics'
import FireFeasibilityCloudHeightField from './FireFeasibilityCloudHeightField'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityDistancesHeightsFormProps {
  position: Position
  target: Target
  onUpdatePositionToTargetRange: (range: number | null) => void
}

function FireFeasibilityDistancesHeightsForm({
  position,
  target,
  onUpdatePositionToTargetRange,
}: FireFeasibilityDistancesHeightsFormProps) {
  const [obstacleHeight, setObstacleHeight] = useState('')
  const [positionObstacleRange, setPositionObstacleRange] = useState('')
  const [hide1Distance, setHide1Distance] = useState('')
  const [hide1HeightDiff, setHide1HeightDiff] = useState('')
  const [hide2Distance, setHide2Distance] = useState('')
  const [hide2HeightDiff, setHide2HeightDiff] = useState('')
  const [flightPath, setFlightPath] = useState('flat')

  const metrics = useFireFeasibilityPositionTargetMetrics(position, target)
  const rangeDisplay = metrics?.range != null ? metrics.range.toFixed(1) : ''

  useEffect(() => {
    onUpdatePositionToTargetRange(metrics?.range ?? null)
  }, [metrics?.range, onUpdatePositionToTargetRange])

  return (
    <div className="flex flex-col gap-4">
      <FormField label="שם מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input type="text" value={target.targetName} disabled />
      </FormField>

      <FormField label="טווח עמדה מטרה" infoTooltipText={RANGE_COMPUTED_TOOLTIP}>
        <Input type="number" value={rangeDisplay} disabled />
      </FormField>

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
          value={obstacleHeight}
          onChange={(e) => setObstacleHeight(e.target.value)}
        />
      </FormField>

      <FormField label="טווח מכשול עמדה">
        <Input
          type="number"
          value={positionObstacleRange}
          onChange={(e) => setPositionObstacleRange(e.target.value)}
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

      <FireFeasibilityCloudHeightField />

      <FormField label="מסלול מעוף">
        <SegmentedToggle
          options={[...FLIGHT_PATH_OPTIONS]}
          value={flightPath}
          onChange={setFlightPath}
        />
      </FormField>
    </div>
  )
}

export default FireFeasibilityDistancesHeightsForm
