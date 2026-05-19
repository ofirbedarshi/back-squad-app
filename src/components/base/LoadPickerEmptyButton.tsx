import type { LoadPickerVariant } from '../loadPicker.types'

interface LoadPickerEmptyButtonProps {
  label: string
  onClick: () => void
  variant?: LoadPickerVariant
  errorMessage?: string
}

function LoadPickerEmptyButton({
  label,
  onClick,
  variant = 'default',
  errorMessage,
}: LoadPickerEmptyButtonProps) {
  const sizeClassName =
    variant === 'section'
      ? 'min-h-10 shrink-0 rounded-xl px-3.5 py-2 text-xs'
      : variant === 'toolbar'
        ? 'shrink-0 rounded-xl px-2.5 py-1 text-xs'
        : 'shrink-0 rounded-xl px-3 py-1 text-xs'

  const className = [
    sizeClassName,
    'font-semibold touch-manipulation',
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
