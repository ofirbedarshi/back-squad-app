import { forwardRef } from 'react'
import {
  getPitchRollVisualState,
  PITCH_ROLL_INVALID_AT_OR_BELOW,
  PITCH_ROLL_MAX,
} from '../domain/pitchRoll'
import FormField from './FormField'
import { inputFieldClassName } from './inputFieldClassName'

interface PitchRollInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  valueForWarning?: number
}

const PitchRollInput = forwardRef<HTMLInputElement, PitchRollInputProps>(
  ({ label, error, valueForWarning, className, ...inputProps }, ref) => {
    const visualState = getPitchRollVisualState(valueForWarning)
    const isInvalid = visualState === 'invalid'
    const isWarning = visualState === 'warning'

    return (
      <FormField label={label} error={error}>
        <input
          ref={ref}
          type="number"
          min={PITCH_ROLL_INVALID_AT_OR_BELOW}
          max={PITCH_ROLL_MAX}
          step={0.1}
          className={inputFieldClassName(!!error || isInvalid, isWarning, false, className)}
          {...inputProps}
        />
      </FormField>
    )
  },
)

PitchRollInput.displayName = 'PitchRollInput'

export default PitchRollInput
