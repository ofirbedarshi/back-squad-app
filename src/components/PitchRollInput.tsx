import FormField from './FormField'
import Input from './Input'

interface PitchRollInputProps {
  label: string
  value: number | undefined
  onChange: (value: number | undefined) => void
  error?: string
}

function PitchRollInput({ label, value, onChange, error }: PitchRollInputProps) {
  const isWarning = typeof value === 'number' && !isNaN(value) && value >= 5 && value <= 10

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.valueAsNumber
    onChange(isNaN(raw) ? undefined : raw)
  }

  return (
    <FormField label={label} error={error}>
      <Input
        type="number"
        value={value ?? ''}
        onChange={handleChange}
        hasError={!!error}
        hasWarning={!error && isWarning}
      />
    </FormField>
  )
}

export default PitchRollInput
