import { forwardRef } from 'react'
import FormField from './FormField'
import { inputFieldClassName } from './inputFieldClassName'

interface PitchRollInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  valueForWarning?: number
}

const PitchRollInput = forwardRef<HTMLInputElement, PitchRollInputProps>(
  ({ label, error, valueForWarning, className, ...inputProps }, ref) => {
    const isWarning =
      typeof valueForWarning === 'number' &&
      !isNaN(valueForWarning) &&
      valueForWarning >= 5 &&
      valueForWarning <= 10

    return (
      <FormField label={label} error={error}>
        <input
          ref={ref}
          type="number"
          min={0}
          max={10}
          step={0.1}
          className={inputFieldClassName(!!error, !error && isWarning, false, className)}
          {...inputProps}
        />
      </FormField>
    )
  },
)

PitchRollInput.displayName = 'PitchRollInput'

export default PitchRollInput
