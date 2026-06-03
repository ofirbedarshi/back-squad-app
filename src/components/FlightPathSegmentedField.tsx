import FormField from './FormField'
import SegmentedToggle from './base/SegmentedToggle'
import { FLIGHT_PATH_OPTIONS } from '../domain/fireFeasibility.constants'

interface FlightPathSegmentedFieldProps {
  label?: string
  value?: string
  onChange: (value: string) => void
  allowDeselect?: boolean
  error?: string
}

function FlightPathSegmentedField({
  label = 'מסלול מעוף',
  value,
  onChange,
  allowDeselect = false,
  error,
}: FlightPathSegmentedFieldProps) {
  return (
    <FormField label={label} error={error}>
      <SegmentedToggle
        options={[...FLIGHT_PATH_OPTIONS]}
        value={value?.trim() ? value : undefined}
        onChange={onChange}
        allowDeselect={allowDeselect}
      />
    </FormField>
  )
}

export default FlightPathSegmentedField
