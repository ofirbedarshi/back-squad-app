import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import {
  CLOUD_HEIGHT_FIELD_TOOLTIP,
  FLIGHT_PATH_OPTIONS,
  POSITION_FIELD_TOOLTIP,
  RANGE_COMPUTED_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import type { FireFeasibilityDistancesHeightsFormFields } from '../domain/fireFeasibility.types'
import { useFireFeasibilityPositionTargetMetrics } from '../hooks/useFireFeasibilityPositionTargetMetrics'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityDistancesHeightsFormProps {
  position: Position
  target: Target
  formState: FireFeasibilityDistancesHeightsFormFields
  cloudHeightValue: string
  cloudHeightViewUnit: string
  onCloudHeightViewUnitChange: (unit: string) => void
  onObstacleHeightChange: (value: string) => void
  onPositionObstacleRangeChange: (value: string) => void
  onHide1DistanceChange: (value: string) => void
  onHide1HeightDiffChange: (value: string) => void
  onHide2DistanceChange: (value: string) => void
  onHide2HeightDiffChange: (value: string) => void
  onFlightPathChange: (value: string) => void
}

function FireFeasibilityDistancesHeightsForm({
  position,
  target,
  formState,
  cloudHeightValue,
  cloudHeightViewUnit,
  onCloudHeightViewUnitChange,
  onObstacleHeightChange,
  onPositionObstacleRangeChange,
  onHide1DistanceChange,
  onHide1HeightDiffChange,
  onHide2DistanceChange,
  onHide2HeightDiffChange,
  onFlightPathChange,
}: FireFeasibilityDistancesHeightsFormProps) {
  const metrics = useFireFeasibilityPositionTargetMetrics(position, target)

  const rangeDisplay = metrics?.range != null ? metrics.range.toFixed(1) : ''

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
          value={formState.obstacleHeight}
          onChange={(e) => onObstacleHeightChange(e.target.value)}
        />
      </FormField>

      <FormField label="טווח מכשול עמדה">
        <Input
          type="number"
          value={formState.positionObstacleRange}
          onChange={(e) => onPositionObstacleRangeChange(e.target.value)}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-1">
        <Input
          type="number"
          value={formState.hide1Distance}
          onChange={(e) => onHide1DistanceChange(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-1">
        <Input
          type="number"
          value={formState.hide1HeightDiff}
          onChange={(e) => onHide1HeightDiffChange(e.target.value)}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-2">
        <Input
          type="number"
          value={formState.hide2Distance}
          onChange={(e) => onHide2DistanceChange(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-2">
        <Input
          type="number"
          value={formState.hide2HeightDiff}
          onChange={(e) => onHide2HeightDiffChange(e.target.value)}
        />
      </FormField>

      <FormField label="גובה עננים מעל פני הים" infoTooltipText={CLOUD_HEIGHT_FIELD_TOOLTIP}>
        <div className="flex flex-col gap-2">
          <div className="w-40 self-end">
            <SegmentedToggle
              size="compact"
              options={[...CLOUD_HEIGHT_UNIT_OPTIONS]}
              value={cloudHeightViewUnit}
              onChange={onCloudHeightViewUnitChange}
            />
          </div>
          <Input type="number" value={cloudHeightValue} disabled />
        </div>
      </FormField>

      <FormField label="מסלול מעוף">
        <SegmentedToggle
          options={[...FLIGHT_PATH_OPTIONS]}
          value={formState.flightPath}
          onChange={onFlightPathChange}
        />
      </FormField>
    </div>
  )
}

export default FireFeasibilityDistancesHeightsForm
