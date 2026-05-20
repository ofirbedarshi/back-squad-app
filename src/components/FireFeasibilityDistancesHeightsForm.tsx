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
import type { FireFeasibilityDistancesHeightsFormUiState } from '../domain/fireFeasibility.types'
import { useFireFeasibilityPositionTargetMetrics } from '../hooks/useFireFeasibilityPositionTargetMetrics'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityDistancesHeightsFormProps {
  position: Position
  target: Target
  form: FireFeasibilityDistancesHeightsFormUiState
  onUpdateForm: (patch: Partial<FireFeasibilityDistancesHeightsFormUiState>) => void
}

function FireFeasibilityDistancesHeightsForm({
  position,
  target,
  form,
  onUpdateForm,
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
          value={form.obstacleHeight}
          onChange={(e) => onUpdateForm({ obstacleHeight: e.target.value })}
        />
      </FormField>

      <FormField label="טווח מכשול עמדה">
        <Input
          type="number"
          value={form.positionObstacleRange}
          onChange={(e) => onUpdateForm({ positionObstacleRange: e.target.value })}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-1">
        <Input
          type="number"
          value={form.hide1Distance}
          onChange={(e) => onUpdateForm({ hide1Distance: e.target.value })}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-1">
        <Input
          type="number"
          value={form.hide1HeightDiff}
          onChange={(e) => onUpdateForm({ hide1HeightDiff: e.target.value })}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-2">
        <Input
          type="number"
          value={form.hide2Distance}
          onChange={(e) => onUpdateForm({ hide2Distance: e.target.value })}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-2">
        <Input
          type="number"
          value={form.hide2HeightDiff}
          onChange={(e) => onUpdateForm({ hide2HeightDiff: e.target.value })}
        />
      </FormField>

      <FormField label="גובה עננים מעל פני הים" infoTooltipText={CLOUD_HEIGHT_FIELD_TOOLTIP}>
        <div className="flex flex-col gap-2">
          <div className="w-40 self-end">
            <SegmentedToggle
              size="compact"
              options={[...CLOUD_HEIGHT_UNIT_OPTIONS]}
              value={form.cloudHeightViewUnit}
              onChange={(unit) => onUpdateForm({ cloudHeightViewUnit: unit })}
            />
          </div>
          <Input type="number" value={form.cloudHeightValue} disabled />
        </div>
      </FormField>

      <FormField label="מסלול מעוף">
        <SegmentedToggle
          options={[...FLIGHT_PATH_OPTIONS]}
          value={form.flightPath}
          onChange={(value) => onUpdateForm({ flightPath: value })}
        />
      </FormField>
    </div>
  )
}

export default FireFeasibilityDistancesHeightsForm
