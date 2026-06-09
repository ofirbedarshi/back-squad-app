import type { Position } from '../domain/position.types'
import { POSITION_FIELD_TOOLTIP } from '../domain/fireFeasibility.constants'
import CoordinateInput from './base/CoordinateInput'
import FormField from './FormField'
import Input from './Input'
import PositionLoadButton from './PositionLoadButton'

interface FireFeasibilityPositionFieldsProps {
  positionId?: string
  position?: Position
  onPositionChange: (positionId: string | null) => void
}

function FireFeasibilityPositionFields({
  positionId,
  position,
  onPositionChange,
}: FireFeasibilityPositionFieldsProps) {
  return (
    <>
      <FormField
        label="שם עמדה"
        infoTooltipText={POSITION_FIELD_TOOLTIP}
        headerAction={
          <PositionLoadButton
            positionId={positionId}
            autoLoadCurrent={false}
            onSelect={(selected) => onPositionChange(selected.id)}
            onClear={() => onPositionChange(null)}
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
    </>
  )
}

export default FireFeasibilityPositionFields
