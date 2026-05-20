import { useEffect, useState } from 'react'
import type { Position, PositionCoordinates } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import {
  CLOUD_HEIGHT_FIELD_TOOLTIP,
  FLIGHT_PATH_OPTIONS,
  POSITION_FIELD_TOOLTIP,
  RANGE_COMPUTED_TOOLTIP,
  TARGET_FIELD_TOOLTIP,
} from '../domain/fireFeasibility.constants'
import { useFireFeasibilityPositionTargetMetrics } from '../hooks/useFireFeasibilityPositionTargetMetrics'
import CoordinateInput from './base/CoordinateInput'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityCoordsFormProps {
  position: Position
  target: Target
  cloudHeightValue: string
  cloudHeightViewUnit: string
  onCloudHeightViewUnitChange: (unit: string) => void
  onUpdatePositionToTargetRange: (range: number | null) => void
}

function FireFeasibilityCoordsForm({
  position,
  target,
  cloudHeightValue,
  cloudHeightViewUnit,
  onCloudHeightViewUnitChange,
  onUpdatePositionToTargetRange,
}: FireFeasibilityCoordsFormProps) {
  const [obstacleCoords, setObstacleCoords] = useState('')
  const [obstacleHeight, setObstacleHeight] = useState('')
  const [hide1Coordinates, setHide1Coordinates] = useState<PositionCoordinates | undefined>()
  const [hide1Height, setHide1Height] = useState('')
  const [hide2Coordinates, setHide2Coordinates] = useState<PositionCoordinates | undefined>()
  const [hide2Height, setHide2Height] = useState('')
  const [flightPath, setFlightPath] = useState('flat')

  const metrics = useFireFeasibilityPositionTargetMetrics(position, target)
  const rangeDisplay = metrics?.range != null ? metrics.range.toFixed(1) : ''

  useEffect(() => {
    onUpdatePositionToTargetRange(metrics?.range ?? null)
  }, [metrics?.range, onUpdatePositionToTargetRange])

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

      <FormField label="טווח עמדה מטרה" infoTooltipText={RANGE_COMPUTED_TOOLTIP}>
        <Input type="number" value={rangeDisplay} disabled />
      </FormField>

      <FormField label='נ"צ מכשול'>
        <Input
          type="text"
          value={obstacleCoords}
          onChange={(e) => setObstacleCoords(e.target.value)}
        />
      </FormField>

      <FormField label="גובה מכשול">
        <Input
          type="number"
          value={obstacleHeight}
          onChange={(e) => setObstacleHeight(e.target.value)}
        />
      </FormField>

      <FormField label='נ"צ הסתר 1'>
        <CoordinateInput
          value={hide1Coordinates}
          onChange={setHide1Coordinates}
        />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input
          type="number"
          value={hide1Height}
          onChange={(e) => setHide1Height(e.target.value)}
        />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <CoordinateInput
          value={hide2Coordinates}
          onChange={setHide2Coordinates}
        />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input
          type="number"
          value={hide2Height}
          onChange={(e) => setHide2Height(e.target.value)}
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
          value={flightPath}
          onChange={setFlightPath}
        />
      </FormField>
    </div>
  )
}

export default FireFeasibilityCoordsForm
