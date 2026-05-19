interface LoadPickerEmptyButtonProps {
  label: string
  onClick: () => void
  compact?: boolean
  large?: boolean
  errorMessage?: string
}

function LoadPickerEmptyButton({
  label,
  onClick,
  compact = false,
  large = false,
  errorMessage,
}: LoadPickerEmptyButtonProps) {
  const className = [
    large ? 'w-full rounded-2xl' : 'shrink-0 rounded-full',
    large ? 'text-base' : 'text-xs',
    'font-semibold touch-manipulation',
    compact ? 'px-2.5 py-1' : large ? 'px-4 py-3.5' : 'px-3 py-1',
    errorMessage
      ? 'text-red-600 bg-red-50 border border-red-300 active:bg-red-100'
      : 'text-blue-600 bg-blue-50 border border-blue-200 active:bg-blue-100',
  ].join(' ')

  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  )
}

export default LoadPickerEmptyButton
