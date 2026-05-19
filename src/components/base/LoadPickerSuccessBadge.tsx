interface LoadPickerSuccessBadgeProps {
  compact?: boolean
}

function LoadPickerSuccessBadge({ compact = false }: LoadPickerSuccessBadgeProps) {
  return (
    <span
      className={[
        'flex shrink-0 items-center justify-center rounded-full bg-green-500 font-bold text-white',
        compact ? 'h-5 w-5 text-[10px]' : 'h-8 w-8 text-sm shadow-md shadow-green-500/25',
      ].join(' ')}
      aria-hidden
    >
      ✓
    </span>
  )
}

export default LoadPickerSuccessBadge
