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
    <span className="inline-block align-middle min-w-[8rem] max-w-full mx-0.5" aria-label={ariaLabel}>
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
