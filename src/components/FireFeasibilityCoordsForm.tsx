import type { Position, PositionCoordinates } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import {
  CLOUD_HEIGHT_FIELD_TOOLTIP,
  FLIGHT_PATH_OPTIONS,
  POSITION_FIELD_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import type { FireFeasibilityCoordsFormFields } from '../domain/fireFeasibility.types'
import CoordinateInput from './base/CoordinateInput'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityCoordsFormProps {
  position: Position
  target: Target
  formState: FireFeasibilityCoordsFormFields
  cloudHeightValue: string
  cloudHeightViewUnit: string
  onCloudHeightViewUnitChange: (unit: string) => void
  onObstacleCoordsChange: (value: string) => void
  onObstacleHeightChange: (value: string) => void
  onHide1CoordinatesChange: (value: PositionCoordinates) => void
  onHide1HeightChange: (value: string) => void
  onHide2CoordinatesChange: (value: PositionCoordinates) => void
  onHide2HeightChange: (value: string) => void
  onFlightPathChange: (value: string) => void
}

function FireFeasibilityCoordsForm({
  position,
  target,
  formState,
  cloudHeightValue,
  cloudHeightViewUnit,
  onCloudHeightViewUnitChange,
  onObstacleCoordsChange,
  onObstacleHeightChange,
  onHide1CoordinatesChange,
  onHide1HeightChange,
  onHide2CoordinatesChange,
  onHide2HeightChange,
  onFlightPathChange,
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
          value={formState.obstacleCoords}
          onChange={(e) => onObstacleCoordsChange(e.target.value)}
        />
      </FormField>

      <FormField label="גובה מכשול">
        <Input
          type="number"
          value={formState.obstacleHeight}
          onChange={(e) => onObstacleHeightChange(e.target.value)}
        />
      </FormField>

      <FormField label='נ"צ הסתר 1'>
        <CoordinateInput
          value={formState.hide1Coordinates}
          onChange={onHide1CoordinatesChange}
        />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input
          type="number"
          value={formState.hide1Height}
          onChange={(e) => onHide1HeightChange(e.target.value)}
        />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <CoordinateInput
          value={formState.hide2Coordinates}
          onChange={onHide2CoordinatesChange}
        />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input
          type="number"
          value={formState.hide2Height}
          onChange={(e) => onHide2HeightChange(e.target.value)}
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

export default FireFeasibilityCoordsForm
