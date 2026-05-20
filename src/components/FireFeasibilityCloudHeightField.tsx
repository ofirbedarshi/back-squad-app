import { cloudHeightDisplayUnitLabel } from '../domain/cloudHeight'
import { CLOUD_HEIGHT_FIELD_TOOLTIP } from '../domain/fireFeasibility.constants'
import { useCloudHeight } from '../hooks/useCloudHeight'
import FormField from './FormField'
import Input from './Input'

function FireFeasibilityCloudHeightField() {
  const { inputValue, settings } = useCloudHeight()
  const unitLabel = cloudHeightDisplayUnitLabel(settings.displayUnit)

  return (
    <FormField
      label={`גובה עננים מעל פני הים (${unitLabel})`}
      infoTooltipText={CLOUD_HEIGHT_FIELD_TOOLTIP}
    >
      <Input type="number" value={inputValue} disabled />
    </FormField>
  )
}

export default FireFeasibilityCloudHeightField
