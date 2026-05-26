import { useAutoGrowInputWidth } from '../hooks/useAutoGrowInputWidth'

const INLINE_INPUT_CLASS =
  'inline-block min-w-[2rem] max-w-full overflow-hidden border-0 border-b border-neutral-800 bg-transparent px-0.5 py-0 text-sm text-neutral-900 underline decoration-neutral-800 decoration-1 underline-offset-2 outline-none focus:border-blue-500'

interface NadbarInlineUserVarInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ariaLabel: string
  numeric?: boolean
}

function NadbarInlineUserVarInput({
  value,
  onChange,
  ariaLabel,
  numeric = false,
}: NadbarInlineUserVarInputProps) {
  const { setRef, onInput } = useAutoGrowInputWidth(null, value)

  return (
    <input
      ref={setRef}
      type="text"
      inputMode={numeric ? 'numeric' : undefined}
      pattern={numeric ? '[0-9]*' : undefined}
      value={value}
      onChange={onChange}
      onInput={onInput}
      className={INLINE_INPUT_CLASS}
      aria-label={ariaLabel}
    />
  )
}

export default NadbarInlineUserVarInput
