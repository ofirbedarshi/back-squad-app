import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import {
  CLOUD_HEIGHT_FIELD_TOOLTIP,
  FLIGHT_PATH_OPTIONS,
  POSITION_FIELD_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import type { FireFeasibilityCoordsFormUiState } from '../domain/fireFeasibility.types'
import CoordinateInput from './base/CoordinateInput'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityCoordsFormProps {
  position: Position
  target: Target
  form: FireFeasibilityCoordsFormUiState
  onUpdateForm: (patch: Partial<FireFeasibilityCoordsFormUiState>) => void
}

function FireFeasibilityCoordsForm({
  position,
  target,
  form,
  onUpdateForm,
}: FireFeasibilityCoordsFormProps) {
  const targetCoordsDisplay = `${target.coordinates.east}/${target.coordinates.north}`

  return (
    <div className="flex flex-col gap-4">
      <FormField label="שם עמדה" infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input type="text" value={position.stationName} disabled />
      </FormField>

      <FormField label='נ"צ עמדה' infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <CoordinateInput value={position.coordinates} onChange={() => {}} disabled />
      </FormField>

      <FormField label="גובה עמדה" infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input type="number" value={String(position.altitude)} disabled />
      </FormField>

      <FormField label="שם מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input type="text" value={target.targetName} disabled />
      </FormField>

      <FormField label='נ"צ מטרה' infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input type="text" value={targetCoordsDisplay} disabled />
      </FormField>

      <FormField label="גובה מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input
          type="number"
          value={target.altitude != null ? String(target.altitude) : ''}
          disabled
        />
      </FormField>

      <FormField label='נ"צ מכשול'>
        <Input
          type="text"
          value={form.obstacleCoords}
          onChange={(e) => onUpdateForm({ obstacleCoords: e.target.value })}
        />
      </FormField>

      <FormField label="גובה מכשול">
        <Input
          type="number"
          value={form.obstacleHeight}
          onChange={(e) => onUpdateForm({ obstacleHeight: e.target.value })}
        />
      </FormField>

      <FormField label='נ"צ הסתר 1'>
        <CoordinateInput
          value={form.hide1Coordinates}
          onChange={(value) => onUpdateForm({ hide1Coordinates: value })}
        />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input
          type="number"
          value={form.hide1Height}
          onChange={(e) => onUpdateForm({ hide1Height: e.target.value })}
        />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <CoordinateInput
          value={form.hide2Coordinates}
          onChange={(value) => onUpdateForm({ hide2Coordinates: value })}
        />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input
          type="number"
          value={form.hide2Height}
          onChange={(e) => onUpdateForm({ hide2Height: e.target.value })}
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

export default FireFeasibilityCoordsForm
