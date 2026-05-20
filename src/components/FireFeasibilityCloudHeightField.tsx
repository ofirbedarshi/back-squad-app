import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import { CLOUD_HEIGHT_FIELD_TOOLTIP } from '../domain/fireFeasibility.constants'
import { useCloudHeight } from '../hooks/useCloudHeight'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'
import Input from './Input'

function FireFeasibilityCloudHeightField() {
  const { inputValue, viewUnit, setViewUnit } = useCloudHeight()

  return (
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
        <Input type="number" value={inputValue} disabled />
      </div>
    </FormField>
  )
}

export default FireFeasibilityCloudHeightField
