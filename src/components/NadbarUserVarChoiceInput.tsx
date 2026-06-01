import SegmentedToggle from './base/SegmentedToggle'

interface NadbarUserVarChoiceInputProps {
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  ariaLabel: string
}

function NadbarUserVarChoiceInput({
  options,
  value,
  onChange,
  ariaLabel,
}: NadbarUserVarChoiceInputProps) {
  const toggleOptions = options.map((option) => ({ label: option, value: option }))

  return (
    <span className="block w-full max-w-full my-1" aria-label={ariaLabel}>
      <SegmentedToggle
        options={toggleOptions}
        value={value}
        onChange={onChange}
        size="compact"
      />
    </span>
  )
}

export default NadbarUserVarChoiceInput
