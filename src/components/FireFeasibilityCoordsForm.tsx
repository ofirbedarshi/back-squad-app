import { useState } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import { useCloudHeight } from '../hooks/useCloudHeight'
import CoordinateInput from './base/CoordinateInput'
import type { CoordinateValue } from './base/coordinateInput.types'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

const FLIGHT_PATH_OPTIONS = [
  { label: 'flat', value: 'flat' },
  { label: 'low', value: 'low' },
  { label: 'lofted', value: 'lofted' },
  { label: 'lofted +', value: '+lofted' },
]

const POSITION_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהעמדה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

const TARGET_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהמטרה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

const CLOUD_HEIGHT_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מגובה בסיס הענן שנשמר במסך הבית ואינו ניתן לעריכה ידנית'

interface FireFeasibilityCoordsFormProps {
  position: Position
  target: Target
}

function FireFeasibilityCoordsForm({ position, target }: FireFeasibilityCoordsFormProps) {
  const { inputValue: cloudHeightValue, viewUnit, setViewUnit } = useCloudHeight()
  const [hide1Coordinates, setHide1Coordinates] = useState<CoordinateValue | undefined>()
  const [hide2Coordinates, setHide2Coordinates] = useState<CoordinateValue | undefined>()
  const [flightPath, setFlightPath] = useState('flat')

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
        <Input type="text" />
      </FormField>

      <FormField label="גובה מכשול">
        <Input type="number" />
      </FormField>

      <FormField label='נ"צ הסתר 1'>
        <CoordinateInput value={hide1Coordinates} onChange={setHide1Coordinates} />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input type="number" />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <CoordinateInput value={hide2Coordinates} onChange={setHide2Coordinates} />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input type="number" />
      </FormField>

      <FormField label="גובה עננים מעל פני הים" infoTooltipText={CLOUD_HEIGHT_FIELD_TOOLTIP}>
        <div className="flex flex-col gap-2">
          <div className="w-40 self-end">
            <SegmentedToggle
              size="compact"
              options={[...CLOUD_HEIGHT_UNIT_OPTIONS]}
              value={viewUnit}
              onChange={setViewUnit}
            />
          </div>
          <Input type="number" value={cloudHeightValue} disabled />
        </div>
      </FormField>

      <FormField label="מסלול מעוף">
        <SegmentedToggle options={FLIGHT_PATH_OPTIONS} value={flightPath} onChange={setFlightPath} />
      </FormField>
    </div>
  )
}

export default FireFeasibilityCoordsForm
