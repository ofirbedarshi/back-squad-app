import { RANGE_COMPUTED_TOOLTIP } from '../domain/fireFeasibility.constants'
import FormField from './FormField'
import Input from './Input'

interface FireFeasibilityRangeFieldProps {
  rangeDisplay: string
}

function FireFeasibilityRangeField({ rangeDisplay }: FireFeasibilityRangeFieldProps) {
  return (
    <FormField label="טווח עמדה מטרה" infoTooltipText={RANGE_COMPUTED_TOOLTIP}>
      <Input type="number" value={rangeDisplay} disabled />
    </FormField>
  )
}

export default FireFeasibilityRangeField
