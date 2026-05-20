import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import FormField from './FormField'
import Input from './Input'

const POSITION_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהעמדה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

const TARGET_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהמטרה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

interface FireFeasibilityCoordsFormProps {
  position: Position
  target: Target
}

function FireFeasibilityCoordsForm({ position, target }: FireFeasibilityCoordsFormProps) {
  const positionCoordsDisplay = `${position.coordinates.east}/${position.coordinates.north}`
  const targetCoordsDisplay = `${target.coordinates.east}/${target.coordinates.north}`

  return (
    <div className="flex flex-col gap-4">
      <FormField label="שם עמדה" infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input type="text" value={position.stationName} disabled />
      </FormField>

      <FormField label='נ"צ עמדה' infoTooltipText={POSITION_FIELD_TOOLTIP}>
        <Input type="text" value={positionCoordsDisplay} disabled />
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
        <Input type="text" />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input type="number" />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <Input type="text" />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input type="number" />
      </FormField>

      <FormField label="גובה עננים מעל פני הים">
        <Input type="number" />
      </FormField>

      <FormField label="מסלול מעוף">
        <Input type="text" />
      </FormField>
    </div>
  )
}

export default FireFeasibilityCoordsForm
